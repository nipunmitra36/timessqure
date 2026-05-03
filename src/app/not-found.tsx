import Link from "next/link";

export default function NotFound() {
    return (
        <section className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
            <h1 className="text-6xl font-extrabold text-black">404</h1>

            <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                Oops! Page not found
            </h2>

            <p className="mt-2 max-w-md text-gray-600">
                The page you are looking for might have been removed or does not exist.
            </p>

            <Link
                href="/"
                className="mt-6 inline-block rounded-xl bg-black px-6 py-3 text-white transition hover:bg-gray-800"
            >
                Back to Home
            </Link>
        </section>
    );
}