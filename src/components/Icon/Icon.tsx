import type { ComponentType } from "react";

type IconProps = {
  className?: string;
  iconName?: string;
  SvgComponent?: ComponentType<{ className?: string }>;
  src?: string;
  width?: number;
  height?: number;
  size?: number;
};

export default function Icon({
  className,
  iconName,
  SvgComponent,
  src,
  width,
  height,
  size,
}: IconProps) {
  const finalWidth = width ?? size;
  const finalHeight = height ?? size;

  if (SvgComponent) {
    return (
      <SvgComponent
        className={className}
        width={finalWidth}
        height={finalHeight}
      />
    );
  }

  if (src) {
    return (
      <img
        src={src}
        className={className}
        alt={iconName ?? "icon"}
        width={finalWidth}
        height={finalHeight}
      />
    );
  }

  if (iconName) {
    return (
      <svg className={className} width={finalWidth} height={finalHeight}>
        <use
          href={`/sprite.svg?v=${import.meta.env.BUILD_VERSION}#${iconName}`}
        />
      </svg>
    );
  }

  return null;
}
