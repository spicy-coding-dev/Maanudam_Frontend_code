type Props = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

export default function ModalWrapper({ title, children, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* Modal Box */}
      <div
        className="
          bg-white
          w-full
          max-w-3xl          /* 🔥 width increased */
          mx-4
          rounded-xl
          text-black
          shadow-xl
          flex
          flex-col
          max-h-[90vh]       /* 🔥 height limit */
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            ×
          </button>
        </div>

        {/* Body (SCROLLABLE) */}
        <div className="px-6 py-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
