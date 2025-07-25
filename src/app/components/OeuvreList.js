'use client';

import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import ConfirmModal from './ConfirmModal';
import Modal from './Modal';
import OeuvreForm from './OeuvreForm';
import Link from 'next/link';
import ProtectedImage from './ProtectedImage';

export default function OeuvreList({
  oeuvres,
  isAdmin,
  onDelete,
  onSuccess,
  showLinkBase = '',
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [editData, setEditData] = useState(null);

  const handleClickDelete = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    try {
      await onDelete(selectedId);
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    } finally {
      setConfirmOpen(false);
      setSelectedId(null);
    }
  };

  const handleClickEdit = (oeuvre) => {
    setEditData(oeuvre);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditData(null);
  };

  const handleSuccess = () => {
    onSuccess?.();
    handleModalClose();
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      {(oeuvres || []).map((oeuvre) => (
        <div
          key={oeuvre.id}
          className="flex flex-col sm:flex-row gap-4 border rounded items-start justify-center relative"
        >
          <Link
            href={`${showLinkBase}/${oeuvre.id}`}
            className="flex flex-col sm:flex-row gap-4 rounded px-4 py-1 items-center relative w-full min-h-[120px]"
          >
            <div className="w-full sm:w-[120px] aspect-square relative shrink-0 md:overflow-hidden rounded mx-auto sm:mx-0">
              <ProtectedImage
                src={oeuvre.images[0]}
                alt={oeuvre.name}
                fill
                containerClass="aspect-square"
              />
            </div>

            <div className="flex-1 w-full space-y-2">
              <h2 className="text-lg font-bold">{oeuvre.name}</h2>
              <p className="text-sm text-gray-700">{oeuvre.description}</p>
            </div>
          </Link>
          {isAdmin && (
            <div className="flex justify-center align-center gap-2 pt-2">
              <button
                onClick={() => handleClickEdit(oeuvre)}
                className="btn btn-sm btn-outline"
              >
                <PencilIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleClickDelete(oeuvre.id)}
                className="btn btn-sm btn-error text-red"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      ))}

      <ConfirmModal
        open={confirmOpen}
        message="Supprimer cette œuvre ?"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <Modal
        isOpen={modalOpen}
        onClose={handleModalClose}
        title="Modifier une œuvre"
      >
        <OeuvreForm initialData={editData} onSuccess={handleSuccess} />
      </Modal>
    </div>
  );
}
