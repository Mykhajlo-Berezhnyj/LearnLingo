import SocialAuthButton from "./SocialAuthButton/SocialAuthButton";

export default function SocialAuth(className: string) {
  return (
    <div className={className}>
      <SocialAuthButton provider="google" />
      <SocialAuthButton provider="facebook" />
      <SocialAuthButton provider="github" />
    </div>
  );
}
