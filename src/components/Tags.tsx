"use client";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className = "" }: TagProps) {
  return (
    <span className={`bg-purple-500/80 text-purple-100 px-4 py-1.5 rounded-full text-base font-medium ${className}`}>
      {children}
    </span>
  );
}

interface TagsProps {
  tags: string[];
  className?: string;
}

export function Tags({ tags, className = "" }: TagsProps) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {tags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </div>
  );
}


