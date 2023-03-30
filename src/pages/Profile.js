import { Link } from "react-router-dom";
const Profile = () => {
  return (
    <div className="flex flex-col m-[5%]">
      <h1 className=" mb-[2%] font-medium text-xl">Account Settings</h1>
      <div className="border-2 rounded">
        <h2 className="font-medium text-lg border-b p-[2%]">
          Personal Information
        </h2>

        <form className="p-[2%]">
          <div class="mb-3 ">
            <label
              for="fName"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              First Name
            </label>
            <input
              type="text"
              id="fName"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Mohammad"
              required
            />
          </div>
          <div class="mb-3">
            <label
              for="fName"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Second Name
            </label>
            <input
              type="text"
              id="sName"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Mosallam"
              required
            />
          </div>
          <div class="mb-3">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Phone Number
            </label>
            <input
              type="phone"
              id="phone"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="0538894521"
              required
            />
          </div>
          <div class="mb-3">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div class="mb-3">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="***************"
              required
            />
          </div>

          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
