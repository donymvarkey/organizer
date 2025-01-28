import { ListFilterIcon, PlusCircleIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Items from "../components/Items";
import { useNavigate } from "react-router";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";
import Layout from "../layout/Layout";
import { createCollectionApi, getAllCollections } from "../api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    name: null,
  });
  const [collections, setCollections] = useState([]);

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
    setErrors({ name: null });
  };

  const fetchAllCollections = async () => {
    try {
      const data = await getAllCollections();
      setCollections(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!formData.name) {
        setErrors({
          name: "Name is required",
        });
        return;
      }
      await createCollectionApi(formData);
      fetchAllCollections();
      setIsOpen(false);
    } catch (error) {
      setErrors({
        name: error?.message,
      });
    }
  };

  const toggleFilterOptions = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const navigateToDetails = (id) => {
    navigate(`/list/${id}`);
  };

  useEffect(() => {
    fetchAllCollections();
  }, []);
  return (
    <Layout>
      <>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg text-slate-600">
            Your Collections
          </span>

          <div className="flex items-center justify-center gap-x-4">
            <button
              onClick={() => setIsOpen(true)}
              className="hover:bg-gray-100 p-2 rounded-md flex items-center justify-center gap-x-2"
            >
              <PlusCircleIcon className="text-zinc-500 w-5 h-5" />
              <span>Create new collection</span>
            </button>
            <div className="flex border rounded-md px-4 py-2 items-center gap-x-2 w-[350px]">
              <SearchIcon className="text-zinc-500 w-5 h-5" />
              <input
                type="search"
                placeholder="Search your collection"
                className="focus:outline-none"
              />
            </div>
            <button
              onClick={toggleFilterOptions}
              className="hover:bg-gray-100 p-2 rounded-md"
            >
              <ListFilterIcon />
            </button>
          </div>
        </div>
        <hr className="bg-slate-300 w-full my-5" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {collections.map((data, index) => (
            <div
              role="button"
              onClick={() => navigateToDetails(data?._id)}
              key={index}
            >
              <Items {...data} />
            </div>
          ))}
        </div>
        {isOpen && (
          <Modal
            title="Create New Collection"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <div>
              <Input
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder={"Collection Name"}
                type="text"
                error={errors["name"]}
              />
              <Input
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder={"Description"}
                type="text"
              />
              <Button onClick={handleSubmit} btnStyle="mt-8" title="Create" />
            </div>
          </Modal>
        )}
      </>
    </Layout>
  );
};

export default Dashboard;
