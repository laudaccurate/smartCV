import {
  MultiSelect,
  NumberInput,
  SegmentedControl,
  Text,
  FileInput,
  TextInput,
  Button,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons";

import React, { useState } from "react";
import Loading from "./Loading";

const Home = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [currentLength, setCurrentLength] = useState(1);
  const [currentTechnologies, setCurrentTechnologies] = useState("");
  const [headshot, setHeadshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
  ]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log({
      firstName,
      lastName,
      currentPosition,
      currentLength,
      currentTechnologies,
      headshot,
    });
    setLoading(true);
  };
  //👇🏻 Renders the Loading component you submit the form
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
            onChange={(e) => setHeadshot(e.target.files[0])}
            size="md"
            // className="mt-[2px]"
          />
        </div>

        <div className="flex justify-center">
          <Button className="w-[25%] " size="md">
            Create Resume
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Home;
