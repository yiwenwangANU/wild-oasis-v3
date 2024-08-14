import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import useCreateCabin from "./useCreateCabin";
import { useEffect } from "react";
import useEditCabin from "./useEditCabin";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabin = {}, handleCloseForm }) {
  const editMode =
    Object.keys(cabin).length !== 0 || cabin.constructor !== Object;

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: cabin });

  const { createCabin, isCreating, createSuccess } = useCreateCabin();
  const { editCabin, isEditing, editSuccess } = useEditCabin();

  let onSubmit;
  if (!editMode) {
    onSubmit = (data) => createCabin(data);
  } else {
    onSubmit = (data) => editCabin(data);
  }

  useEffect(() => {
    if (createSuccess || editSuccess) {
      reset();
      handleCloseForm();
    }
  }, [createSuccess, editSuccess, reset, handleCloseForm]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", { required: true })}
        />
        {errors.name && <Error>This field is required</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", { required: true, min: 0 })}
        />
        {errors.maxCapacity?.type === "required" && (
          <Error>This field is required</Error>
        )}
        {errors.maxCapacity?.type === "min" && (
          <Error>The minimum capacity should larger than 0</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", { required: true, min: 0 })}
        />
        {errors.regularPrice?.type === "required" && (
          <Error>This field is required</Error>
        )}
        {errors.regularPrice?.type === "min" && (
          <Error>The minimum price should larger than 0</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: true,
            validate: (value) => +value <= +getValues("regularPrice"),
          })}
        />
        {errors.discount?.type === "required" && (
          <Error>This field is required</Error>
        )}
        {errors.discount?.type === "validate" && (
          <Error>Discount should not large than the price</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: true })}
        />
        {errors.description && <Error>This field is required</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", { required: !editMode })}
        />
        {errors.image && <Error>Cabin image is required</Error>}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          type="reset"
          disabled={isCreating || isEditing}
          onClick={() => handleCloseForm()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isCreating || isEditing}>
          {editMode ? "Update Cabin" : "Add Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
