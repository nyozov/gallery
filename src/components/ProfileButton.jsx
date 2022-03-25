import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { auth } from "../firebase/config";
import { AccountBox as ProfileIcon } from "@mui/icons-material";
import { useNavigate} from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ setLoggedIn, setCurrentProfile }) {
  const navigate = useNavigate()
  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        navigate('/login')
        setLoggedIn(false);
        setCurrentProfile('')
       
        console.log("sign-out successful");
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
          <ProfileIcon />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href=""
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  {auth.currentUser.email}
                </a>
              )}
            </Menu.Item>

            
              <Menu.Item>
                {({ active }) => (
                  <button
                  onClick={signOut}
                 
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
