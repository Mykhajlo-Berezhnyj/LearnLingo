import type { ComponentType } from "react";

type IconProps = {
  className?: string;
  iconName?: string;
  SvgComponent?: ComponentType<{ className?: string }>;
  src?: string;
};

export default function Icon({
  className,
  iconName,
  SvgComponent,
  src,
}: IconProps) {
  if (SvgComponent) {
    return <SvgComponent className={className} />;
  }

  if (src) {
    return <img src={src} className={className} alt={iconName ?? "icon"} />;
  }

  if (iconName) {
    return (
      <svg className={className}>
        <use
          href={`/sprite.svg?v=${import.meta.env.BUILD_VERSION}#${iconName}`}
        />
      </svg>
    );
  }

  return null;
}
