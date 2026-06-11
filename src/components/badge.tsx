import { Bookmark } from "@/types";

const categoryBadgeStyles: Record<string, string> = {
  Professional: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100",
  Projects: "bg-amber-50 text-amber-800 ring-1 ring-amber-200",
  Social: "bg-rose-50 text-rose-700 ring-1 ring-rose-100",
  Documents: "bg-sky-50 text-sky-700 ring-1 ring-sky-100",
  Other: "bg-slate-100 text-slate-600 ring-1 ring-slate-200/50",
};

const Badge = ({ bookmark, type }: { bookmark: Bookmark; type: string }) => {
  if (type == "visibility") {
    return (
      <span
        className={`inline-flex h-5 shrink-0 items-center rounded-full px-3 text-xs font-medium ${
          bookmark.is_public
            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
            : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
        }`}
      >
        {bookmark.is_public ? "Public" : "Private"}
      </span>
    );
  } else {
    return (
      <span
        className={`inline-flex h-5 shrink-0 items-center rounded-full px-3 text-xs font-medium ${
          categoryBadgeStyles[bookmark.category] || categoryBadgeStyles.Other
        }`}
      >
        {bookmark.category || "Other"}
      </span>
    );
  }
};

export default Badge;
