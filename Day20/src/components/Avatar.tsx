type AvatarProps = {
  name: string;
  imageUrl?: string;
};

export function Avatar({ name, imageUrl }: AvatarProps) {
  return (
    <div className="avatar" aria-label={`Avatar for ${name}`}>
      {imageUrl ? (
        <img src={imageUrl} alt="" />
      ) : (
        <span>{name.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
}
