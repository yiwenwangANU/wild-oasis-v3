import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import useGetSettings from "./useGetSettings";
function UpdateSettingsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { settings, isPending } = useGetSettings();
  if (isPending) return <Spinner />;
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
          defaultValue={settings?.minBookingLength}
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
          defaultValue={settings?.maxBookingLength}
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
          defaultValue={settings?.maxGuestsPerBooking}
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
          defaultValue={settings?.breakfastPrice}
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
