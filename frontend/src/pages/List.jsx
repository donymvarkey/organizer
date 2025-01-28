import {
  ArrowLeftCircle,
  LinkIcon,
  PlusCircleIcon,
  VideoIcon,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";
import Table from "../components/Table";
import { VALIDATION_RULES } from "../constants";
import Layout from "../layout/Layout";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";
import {
  createNewLinkApi,
  deleteLinkApi,
  getAllLinksByCollectionApi,
  getCollectionByIdApi,
  updateLinkApi,
} from "../api";

const List = () => {
  const navigate = useNavigate();
  const { collectionId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlType, setUrlType] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    url: "",
  });
  const [errors, setErrors] = useState({
    name: null,
    url: null,
  });
  const [links, setLinks] = useState([]);
  const [collectionDetails, setCollectionDetails] = useState({});
  const [editItem, setEditItem] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add new Link");
  const [editItemID, setEditItemID] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleValidate = (key, value) => {
    const rule = VALIDATION_RULES[key];

    if (!rule) {
      console.warn(`No validation rule found for key: ${key}`);
      return;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: rule.validate(value) ? null : rule.errorMessage,
    }));
  };

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
    setErrors({
      ...errors,
      [key]: null,
    });
  };

  const handleSubmit = async () => {
    try {
      let data;
      if (errors["name"] || errors["url"]) {
        return;
      }
      const form = {
        ...formData,
        urlType,
      };

      console.log(form);

      if (editItem) {
        data = await updateLinkApi(editItemID, form);
      } else {
        data = await createNewLinkApi(form, collectionId);
      }
      if (data?.statusCode === 201 || data?.statusCode === 200) {
        await fetchAllLinks();
      }
      setIsModalOpen(false);
      setEditItem(false);
      setModalTitle("Add new Link");
      setEditItemID("");
      setFormData({
        name: "",
        description: "",
        url: "",
      });
      setUrlType(0);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllLinks = async () => {
    try {
      const collData = await getCollectionByIdApi(collectionId);
      setCollectionDetails(collData?.data);
      const data = await getAllLinksByCollectionApi(collectionId);
      if (data?.statusCode === 200) {
        setLinks(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteItem = async () => {
    try {
      const data = await deleteLinkApi(editItemID);
      if (data?.statusCode === 200) {
        setEditItemID(null);
        setShowDeleteDialog(false);
        fetchAllLinks();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllLinks();
  }, []);
  return (
    <Layout>
      <div className="mt-4 mb-8 flex items-center justify-between gap-x-4">
        <div className="flex items-center justify-start gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center justify-center gap-x-2 text-gray-500 hover:text-blue-500"
          >
            <ArrowLeftCircle />
            <span>Back</span>
          </button>
          <h3 className="text-indigo-600 text-lg">{collectionDetails?.name}</h3>
        </div>

        <button
          onClick={() => {
            setIsModalOpen((prev) => !prev);
          }}
          className="flex items-center justify-center gap-2 border border-indigo-600 text-indigo-600 cursor-pointer hover:bg-indigo-600 hover:text-slate-100 rounded-md px-4 py-2 my-3"
        >
          <PlusCircleIcon />
          <span>Add new link</span>
        </button>
      </div>
      <div>
        <Table
          data={links}
          onDelete={(id) => {
            setEditItemID(id);
            setShowDeleteDialog(true);
          }}
          onEdit={(item) => {
            setModalTitle("Update Link");
            setEditItemID(item?._id);
            setEditItem(true);
            setFormData({
              name: item?.name,
              description: item?.description,
              url: item?.url,
            });
            setIsModalOpen(true);
            setUrlType(item?.urlType);
          }}
        />
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditItem(false);
            setUrlType(0);
            setFormData({
              name: "",
              description: "",
              url: "",
            });
          }}
          title={modalTitle}
        >
          <div>
            <Input
              onBlur={(e) => {
                handleValidate("name", e.target.value);
              }}
              defaultValue={formData["name"]}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder={"Name"}
              error={errors["name"]}
            />
            <Input
              defaultValue={formData["description"]}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder={"Description"}
            />
            <Input
              defaultValue={formData["url"]}
              onBlur={(e) => handleValidate("url", e.target.value)}
              onChange={(e) => handleChange("url", e.target.value)}
              placeholder={"URL"}
              type="url"
              error={errors["url"]}
            />
            <div className="text-gray-300 mt-3 text-xs px-1">
              Select URL Type
            </div>
            <div className="flex items-center justify-center gap-x-2 w-full mt-3">
              <div
                role="button"
                onClick={() => setUrlType(0)}
                className={`border rounded-md flex items-center justify-center gap-3 w-1/2 py-2 cursor-pointer hover:bg-indigo-100 ${
                  urlType === 0
                    ? "border-indigo-600 text-indigo-600"
                    : "bg-white text-black"
                }`}
              >
                <VideoIcon />
                <span>Video</span>
              </div>
              <div
                role="button"
                onClick={() => setUrlType(1)}
                className={`border rounded-md flex items-center justify-center gap-3 w-1/2 py-2 cursor-pointer hover:bg-indigo-100 ${
                  urlType === 1
                    ? "border-indigo-600 text-indigo-600"
                    : "bg-white text-black"
                }`}
              >
                <LinkIcon />
                <span>URL</span>
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              btnStyle="mt-4"
              title={editItem ? "Update" : "Save"}
            />
          </div>
        </Modal>
      )}

      {showDeleteDialog && (
        <Modal
          title="Delete Item"
          isOpen={showDeleteDialog}
          onClose={() => {
            setShowDeleteDialog(false);
            setEditItemID(null);
          }}
        >
          <div className="my-10">
            <p className="text-xl text-center font-medium text-gray-600">
              Are you to delete this item? This operation is irreversible
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <Button
              onClick={() => {
                setShowDeleteDialog(false);
                setEditItemID(null);
              }}
              btnStyle="border bg-white"
              titleStyle="text-gray-800"
              title="Cancel"
            />
            <Button
              onClick={handleDeleteItem}
              btnStyle="bg-red-600"
              title="Delete"
            />
          </div>
        </Modal>
      )}
    </Layout>
  );
};

export default List;
