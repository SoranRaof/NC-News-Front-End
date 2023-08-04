import { useContext, useEffect } from "react";
import { fetchTopics } from "../utils/api";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import UserLogin from "./UserLogin.jsx";
import {
  ArrowLongRightIcon,
  ArrowLongLeftIcon,
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user";

const NavBar = ({ setSelectedTopic }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopics(setTopics).then((topicsList) => {
      setTopics(topicsList);
    });
  }, [setTopics]);

  const handleLogoutClick = () => {
    if (currentUser) {
      setCurrentUser(undefined);
    }
  };

  const handleAllClick = () => {
    setSelectedTopic("");
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic.slug);
    navigate("/");
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <header className="bg-white w-full">
      <nav
        className="mx-auto flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <Link className="flex lg:flex-1" to="/">
          <h1 className="text-2xl sm:text-3xl font-bold ">Northcoders News</h1>
        </Link>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link
            className="text-sm font-semibold rounded-lg leading-6 text-gray-900  hover:bg-gray-400  p-2"
            to="/"
          >
            Home
          </Link>
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold rounded-lg leading-6 text-gray-900  hover:bg-gray-400 p-2">
              Topics
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-black"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  <div onClick={() => handleAllClick()}>all</div>
                  {topics.map((topic) => (
                    <div
                      onClick={() => handleTopicClick(topic)}
                      key={topic.slug}
                    >
                      <div className="flex-auto">{topic.slug}</div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          <Link
            className="text-sm font-semibold rounded-lg leading-6 text-gray-900  hover:bg-gray-400 p-2"
            to="/users"
          >
            Users
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <UserLogin />
          {!currentUser ? (
            <Link
              className="flex flex-row items-center text-sm font-semibold rounded-lg leading-6 text-gray-900  hover:bg-gray-400 p-2"
              to={`/users`}
            >
              Login
              <ArrowLongRightIcon className="h-9 w-9 p-2 text-black-500  hover:bg-gray-400" />
            </Link>
          ) : (
            <p
              className="text-sm font-semibold rounded-lg leading-6 text-gray-900  hover:bg-gray-400"
              onClick={handleLogoutClick}
            >
              Logout
              <ArrowLongLeftIcon className="h-8 w-8 text-black-500" />
            </p>
          )}
        </div>
      </nav>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Link
                        className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-400"
                        to="/"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Home
                      </Link>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-400">
                        Topics
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...topics].map((topic) => (
                          <Disclosure.Button
                            onClick={() => {
                              setMobileMenuOpen(false);
                              handleTopicClick(topic);
                            }}
                            key={topic.slug}
                            as="a"
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-medium leading-7 text-gray-900  hover:bg-gray-400"
                          >
                            {topic.slug}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Link
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400"
                  to="/users"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Users
                </Link>
                <div className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900  hover:bg-gray-400">
                  <UserLogin currentUser={currentUser} />
                  {!currentUser ? (
                    <div className="py-6">
                      <Link
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400"
                        to={`/users`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Login
                        <ArrowLongRightIcon className="h-8 w-8 text-black-500" />
                      </Link>
                    </div>
                  ) : (
                    <p
                      className="text-sm font-semibold leading-6 text-gray-900"
                      onClick={handleLogoutClick}
                    >
                      Logout
                      <ArrowLongLeftIcon className="h-8 w-8 text-black-500" />
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default NavBar;
