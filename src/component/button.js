import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faInfo,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
const ButtonAdd = ({ title, handle }) => {
  return (
    <button
      onClick={() => handle()}
      className="flex items-center justify-center rounded-lg bg-purple-100  font-bold text-white 
  p-3 text
  "
      type="button"
    >
      {title}
    </button>
  );
};

const ButtonEdit = ({ id, handle }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handle(id);
      }}
      className="px-4 py-2 bg-blue-600  text-white rounded-md shadow "
    >
      <FontAwesomeIcon icon={faEdit} className="mr-2" />
      Edit
    </button>
  );
};

const ButtonDelete = ({ id, handle }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handle(id);
      }}
      className="px-4 py-2 bg-red-600 text-white rounded-md shadow "
    >
      <FontAwesomeIcon icon={faTrash} className="mr-2" />
      Hapus
    </button>
  );
};

const ButtonDetail = ({ id, handle }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handle(id);
      }}
      className="px-4 py-2 bg-green-600 text-white rounded-md shadow "
    >
      <FontAwesomeIcon icon={faInfo} className="mr-2" />
      Detail
    </button>
  );
};

const ButtonBack = ({ handle }) => {
  return (
    <button
      onClick={() => handle()}
      className="px-4 py-2 bg-gray-600 text-white rounded-md shadow "
    >
      <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
      Back
    </button>
  );
};

const ButtonCancel = ({ handle }) => {
  return (
    <button
      onClick={() => handle()}
      className="px-4 py-2 bg-gray-600 text-white rounded-md shadow "
      type="button"
    >
      Batal
    </button>
  );
};
const ButtonSave = () => {
  return (
    <button
      className="px-4 py-2 bg-purple-600 text-white rounded-md shadow "
      type="submit"
    >
      Simpan
    </button>
  );
};

export {
  ButtonAdd,
  ButtonEdit,
  ButtonDelete,
  ButtonDetail,
  ButtonBack,
  ButtonCancel,
  ButtonSave,
};
