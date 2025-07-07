'use client';
import Button from "./Button";

export default function ConfirmModal({ open, onCancel, onConfirm, message }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-40 h-[30%] w-[30%] border my-auto mx-auto">
      <div className="bg-white p-6 rounded max-w-md w-full text-center space-y-4">
        <h3 className="text-lg font-bold">{message}</h3>
        <div className="flex justify-center gap-4 mt-10">
          <Button type="submit" onClick={onCancel}>Annuler</Button>
          <Button type="submit" onClick={onConfirm}>Valider</Button>
        </div>
      </div>
    </div>
  );
}
