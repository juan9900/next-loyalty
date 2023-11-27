import LoginForm from "@/components/loginForm";

export default function Page() {
  return (
    <section className="bg-gray-800 dark:bg-white-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-gray"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://res.cloudinary.com/mdnclientes/image/upload/v1701097580/logo-MDN_oz4ugu.png"
            alt="logo"
          />
          MDN LOYALTY
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-400 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray">
              Iniciar sesión
            </h1>
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
