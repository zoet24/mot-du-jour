interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="absolute bg-white px-8 py-4 space-y-2 rounded-lg border border-grey">
        <h2 className="text-lg text-center">Delete Word</h2>
        <p>Are you sure you want to delete this word?</p>
        <div className="space-x-4 text-center">
          <button className="btn" onClick={onConfirm}>
            Delete
          </button>
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
