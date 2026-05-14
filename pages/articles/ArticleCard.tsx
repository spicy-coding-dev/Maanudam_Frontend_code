import { useState, useRef, useEffect } from "react";
import type { Book } from "./types";
import { FiMoreVertical, FiEdit, FiTrash2 } from "react-icons/fi";
import { MdBlock, MdOutlinePublishedWithChanges } from "react-icons/md";

type Props = {
  book: Book;
  onEdit?: (book: Book) => void;
  onDelete?: (book: Book) => void;
  onStatusChange?: (book: Book, status: Book["status"]) => void;
  onClick?: () => void; // 🔥 CARD CLICK
};

export default function ArticleCard({
  book,
  onEdit,
  onDelete,
  onStatusChange,
  onClick,
}: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /* 🔒 close menu when clicking outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    /* 🔥 CARD CLICK HERE */
    <div
      onClick={onClick}
      className="relative cursor-pointer bg-white border border-gray-300
                 rounded-lg shadow-sm hover:shadow-md transition
                 w-full min-w-[300px] mx-auto"
    >
      {/* 🔹 MENU (stop card click) */}
      <div
        className="absolute top-2 right-2"
        ref={menuRef}
        onClick={(e) => e.stopPropagation()} // 🔥 IMPORTANT
      >
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-gray-600 hover:text-black"
        >
          <FiMoreVertical size={18} />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur
                          border rounded-xl shadow-xl z-30">
            <MenuItem
              icon={<FiEdit />}
              label="Edit"
              onClick={() => onEdit?.(book)}
            />
            <MenuDivider />

            <MenuItem
              icon={<FiTrash2 />}
              label="Delete"
              danger
              onClick={() => onDelete?.(book)}
            />
            <MenuDivider />

            {book.status === "PUBLISHED" && (
              <>
                <MenuItem
                  icon={<MdOutlinePublishedWithChanges />}
                  label="Move to Draft"
                  onClick={() => onStatusChange?.(book, "DRAFT")}
                />
                <MenuItem
                  icon={<MdBlock />}
                  label="Move to Block"
                  onClick={() => onStatusChange?.(book, "BLOCKED")}
                />
              </>
            )}

            {book.status === "DRAFT" && (
              <>
                <MenuItem
                  icon={<MdOutlinePublishedWithChanges />}
                  label="Move to Published"
                  onClick={() => onStatusChange?.(book, "PUBLISHED")}
                />
                <MenuItem
                  icon={<MdBlock />}
                  label="Move to Block"
                  onClick={() => onStatusChange?.(book, "BLOCKED")}
                />
              </>
            )}

            {book.status === "BLOCKED" && (
              <MenuItem
                icon={<MdOutlinePublishedWithChanges />}
                label="Move to Published"
                onClick={() => onStatusChange?.(book, "PUBLISHED")}
              />
            )}
          </div>
        )}
      </div>

      {/* 🔹 CARD BODY */}
      <div className="p-7 pt-7 space-y-3 ">
        <div className="overflow-hidden rounded-md">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-[220px] object-cover"
          />
        </div>

        {book.magazineNo && (
          <span className="inline-block text-[10px] font-semibold px-2 py-1 rounded bg-blue-100 text-blue-700">
            இதழ் #{book.magazineNo}
          </span>
        )}

        <h3 className="text-sm font-bold text-gray-900 line-clamp-2">
          {book.title}
        </h3>

        {book.subTitle && (
          <p className="text-xs text-gray-600 line-clamp-2">
            {book.subTitle}
          </p>
        )}

        {book.author && (
          <p className="text-[11px] text-gray-500">✍️ {book.author}</p>
        )}

        {book.paid && book.price !== null && (
          <p className="text-sm font-semibold text-green-600">
            ₹ {book.price}
          </p>
        )}
      </div>
    </div>
  );
}

/* 🔹 MENU HELPERS */
function MenuItem({
  icon,
  label,
  onClick,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // 🔥 STOP CARD CLICK
        onClick();
      }}
      className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-left
        hover:bg-gray-100 ${danger ? "text-red-600" : "text-gray-700"}`}
    >
      {icon}
      {label}
    </button>
  );
}

function MenuDivider() {
  return <div className="h-px bg-gray-200 my-1" />;
}
