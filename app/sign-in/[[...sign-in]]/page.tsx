import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-lightgray dark:bg-darkbg">
      <SignIn 
        fallbackRedirectUrl="/dashboard"
        appearance={{
          elements: {
            footer: "hidden", // Hide the "Don't have an account? Sign up" link
          },
        }}
      />
    </div>
  );
}
