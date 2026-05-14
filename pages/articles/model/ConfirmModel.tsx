import ModalWrapper from "./ModelWrapper";

type Props = {
  title: string;
  message: string;
  confirmText?: string;
  danger?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmModal({
  title,
  message,
  confirmText = "Confirm",
  danger,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <ModalWrapper title={title} onClose={onCancel}>
      <p className="text-sm text-gray-600">{message}</p>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-md border"
        >
          Cancel
        </button>

        <button
          onClick={onConfirm}
          className={`px-4 py-2 rounded-md text-white
            ${danger ? "bg-red-600" : "bg-[#1f3c88]"}`}
        >
          {confirmText}
        </button>
      </div>
    </ModalWrapper>
  );
}
