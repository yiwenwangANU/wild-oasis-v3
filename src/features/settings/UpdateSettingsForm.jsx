import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

function UpdateSettingsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Minimum nights/booking"
        error={errors?.min_nights?.message}
      >
        <Input
          type="number"
          id="min_nights"
          {...register("min_nights", {
            required: "This is required",
            min: { value: 1, message: "Minimum nights should larger than 0" },
          })}
        />
      </FormRow>
      <FormRow
        label="Maximum nights/booking"
        error={errors?.max_nights?.message}
      >
        <Input
          type="number"
          id="max_nights"
          {...register("max_nights", {
            required: "This is required",
            min: { value: 1, message: "Maximum nights should larger than 0" },
          })}
        />
      </FormRow>
      <FormRow
        label="Maximum guests/booking"
        error={errors?.max_guests?.message}
      >
        <Input
          type="number"
          id="max_guests"
          {...register("max_guests", {
            required: "This is required",
            min: { value: 1, message: "Maximum guests should larger than 0" },
          })}
        />
      </FormRow>
      <FormRow label="Breakfast price" error={errors?.breakfast_price?.message}>
        <Input
          type="number"
          id="breakfast_price"
          {...register("breakfast_price", {
            required: "This is required",
            min: { value: 1, message: "Breakfast price should larger than 0" },
          })}
        />
      </FormRow>
      <FormRow>
        <Button type="submit">Update Settings</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
