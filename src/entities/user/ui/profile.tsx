import avatarSrc from "../media/avatar.png";
import clsx from "clsx";

type ProfileProps = {
  className?: string;
  name: string;
  rating: string;
  avatar?: string;
};

export function Profile({
  className,
  name,
  rating,
  avatar = avatarSrc,
}: ProfileProps) {
  return (
    <div
      className={clsx(
        "flex items-center gap-2 text-start text-teal-600",
        className,
      )}
    >
      <img src={avatar} width={48} height={48} alt="avatar" loading="eager" />
      <div className="overflow-hidden">
        <div className=" text-lg leading-tight truncate ">{name}</div>
        <div className="text-slate-400 text-xs leading-tight">
          Рейтинг: {rating}
        </div>
      </div>
    </div>
  );
}
