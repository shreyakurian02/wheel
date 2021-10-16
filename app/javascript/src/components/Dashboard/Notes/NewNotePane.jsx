import React from "react";

import { Check } from "@bigbinary/neeto-icons";
import { Formik, Form } from "formik";
import { Button, Pane, Typography } from "neetoui/v2";
import { Toastr } from "neetoui/v2";
import { Input, Select } from "neetoui/v2/formik";
import * as yup from "yup";

import { ASSIGNED_CONTACT, TAGS } from "./Constants";

export default function NewNotePane({ newNotes, showPane, setShowPane }) {
  const onClose = () => setShowPane(false);

  const handleSubmit = async values => {
    try {
      newNotes(values);
      setShowPane(!showPane);
      Toastr.success("Note Added Successfully");
    } catch (err) {
      logger.error(err);
    }
  };
  return (
    <Pane isOpen={showPane} onClose={onClose}>
      <Pane.Header>
        <Typography style="h2">Add New Note</Typography>
      </Pane.Header>
      <Formik
        initialValues={{
          title: "",
          description: "",
          assignedContact: {},
          tags: []
        }}
        onSubmit={handleSubmit}
        validationSchema={yup.object({
          title: yup.string().required("Title is required"),
          description: yup.string().required("Description is required"),
          assignedContact: yup
            .object({
              label: yup.string(),
              value: yup.string()
            })
            .required("Assigned contact is required"),
          tags: yup.array().min(1).required("Tag is required")
        })}
      >
        <Form className="w-full">
          <Pane.Body>
            <div className="w-full space-y-6">
              <Input
                label="Title"
                name="title"
                className="mb-6"
                placeholder="Enter Title"
                required={true}
              />
              <Input
                label="Description"
                name="description"
                className="mb-6"
                placeholder="Enter Description"
                size="large"
                required={true}
              />
              <Select
                isClearable
                isSearchable
                label="Assigned Contact"
                name="assignedContact"
                options={ASSIGNED_CONTACT}
                placeholder="Select a Role"
              />
              <Select
                isClearable
                isSearchable
                required={true}
                isMulti
                label="Tags"
                name="tags"
                options={TAGS}
                placeholder="Select Tags"
              />
            </div>
          </Pane.Body>
          <Pane.Footer className="flex space-x-4">
            <Button icon={Check} label="Save Changes" type="submit" />
            <Button style="text" label="Cancel" onClick={onClose} />
          </Pane.Footer>
        </Form>
      </Formik>
    </Pane>
  );
}
