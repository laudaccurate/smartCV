import {
  MultiSelect,
  NumberInput,
  SegmentedControl,
  Text,
  FileInput,
  TextInput,
  Button,
} from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IconTextPlus, IconTrash, IconUpload } from "@tabler/icons";

import React, { useState } from "react";
import Loading from "./Loading";

const Home = ({ setResumeData }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [currentLength, setCurrentLength] = useState(1);
  const [currentTechnologies, setCurrentTechnologies] = useState("");
  const [companyInfo, setCompanyInfo] = useState([
    { company: "", position: "" },
  ]);
  const [headshot, setHeadshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([
    { value: "React", label: "React" },
    { value: "Angular", label: "Angular" },
    { value: "Flutter", label: "Flutter" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "Tailwind", label: "Tailwind" },
  ]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("headshotImage", headshot, headshot.name);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("currentPosition", currentPosition);
    formData.append("currentLength", currentLength);
    formData.append("currentTechnologies", currentTechnologies);
    formData.append("workHistory", JSON.stringify(companyInfo));
    axios
      .post("http://localhost:4000/resume/create", formData, {})
      .then((res) => {
        if (res.data.message) {
          console.log(res.data.data);
          setResumeData(res.data.data);
          navigate("/resume");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleAddCompany = () =>
    setCompanyInfo([...companyInfo, { company: "", position: "" }]);

  const handleRemoveCompany = (index) => {
    const list = [...companyInfo];
    list.splice(index, 1);
    setCompanyInfo(list);
  };

  const handleUpdateCompany = (e, index) => {
    const { name, value } = e.target;
    const list = [...companyInfo];
    list[index][name] = value;
    setCompanyInfo(list);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="app">
      <h1>Resume Builder</h1>
      <p>Generate a resume with ChatGPT in few seconds</p>
      <form
        onSubmit={handleFormSubmit}
        method="POST"
        encType="multipart/form-data"
        className="p-8 w-[70%] flex flex-col shadow-md shadow-slate-500 h-[60%]"
      >
        <div className=" grid grid-cols-2 space-x-6 items-center justify-between w-full">
          <TextInput
            label="Enter your first name"
            placeholder="First Name"
            withAsterisk
            size="md"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextInput
            label="Enter your last name"
            placeholder="Last Name"
            withAsterisk
            size="md"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 space-x-6 items-center justify-between w-full">
          <div className="flex flex-col justify-start mb-[11px]">
            <Text className="text-base font-[450] font-serif">
              Experience Level
            </Text>
            <SegmentedControl
              label="Experience Level"
              size="md"
              fullWidth
              data={["Junior", "Mid-level", "Senior", "Expert"]}
            />
          </div>

          <NumberInput
            defaultValue={1}
            label="For how long? (year)"
            placeholder="Years of experience"
            withAsterisk
            size="md"
            value={currentLength}
            onChange={(val) => setCurrentLength(val)}
          />
        </div>
        <div className="grid grid-cols-2 space-x-6">
          <TextInput
            label="Current Position"
            placeholder="Position"
            withAsterisk
            size="md"
            value={currentPosition}
            onChange={(e) => setCurrentPosition(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 justify-between space-x-6 mb-10">
          <MultiSelect
            data={data}
            label="Technologies used"
            size="md"
            placeholder="Pick all that you used"
            nothingFound="Nothing found"
            searchable
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => {
              const item = { value: query, label: query };
              setData((current) => [...current, item]);
              return item;
            }}
            value={currentTechnologies}
            onChange={setCurrentTechnologies}
          />

          <FileInput
            label="Upload your headshot image"
            placeholder="Headshot image"
            withAsterisk
            accept="image/x-png,image/jpeg"
            icon={<IconUpload size={14} />}
            onChange={setHeadshot}
            size="md"
            // className="mt-[2px]"
          />
        </div>
        <div className="mb-10">
          <h3>Companies you've worked at</h3>
          {companyInfo.map((company, index) => (
            <div
              className="flex items-center justify-between w-full"
              key={index}
            >
              <div className="companies">
                <TextInput
                  label="Company Name"
                  placeholder="Company Name"
                  name="company"
                  size="md"
                  onChange={(e) => handleUpdateCompany(e, index)}
                />
              </div>
              <div className="companies">
                <TextInput
                  label="Position Held"
                  name="position"
                  placeholder="Position"
                  size="md"
                  onChange={(e) => handleUpdateCompany(e, index)}
                />
              </div>

              <div className="btn__group">
                <IconTrash
                  size={40}
                  onClick={() => handleRemoveCompany(index)}
                  className={`${
                    !(companyInfo.length > 1) ? "opacity-0" : "cursor-pointer"
                  } text-red-600 px-2 text-base`}
                />
                <IconTextPlus
                  size={40}
                  onClick={handleAddCompany}
                  className={`${
                    !(companyInfo.length - 1 === index && companyInfo.length)
                      ? "opacity-0"
                      : "cursor-pointer"
                  } text-green-600 px-2 `}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            className="w-[25%] "
            size="md"
            type="submit"
            // onClick={(e) => handleFormSubmit(e)}
          >
            Create Resume
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Home;
