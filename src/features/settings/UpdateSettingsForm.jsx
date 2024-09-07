import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import useGetSettings from "./useGetSettings";
import useUpdateSettings from "./useUpdateSettings";
function UpdateSettingsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { settings, isPending: isGettingSettings } = useGetSettings();
  const { updateSettings, isPending: isUpdatingSettings } = useUpdateSettings();
  if (isGettingSettings) return <Spinner />;
  const onSubmit = (data) => {
    console.log(data);
    updateSettings(data);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Minimum nights/booking"
        error={errors?.minBookingLength?.message}
      >
        <Input
          type="number"
          id="minBookingLength"
          defaultValue={settings?.minBookingLength}
          disabled={isUpdatingSettings}
          {...register("minBookingLength", {
            required: "This is required",
            min: { value: 1, message: "Minimum nights should larger than 0" },
          })}
        />
      </FormRow>
      <FormRow
        label="Maximum nights/booking"
        error={errors?.maxBookingLength?.message}
      >
        <Input
          type="number"
          id="maxBookingLength"
          defaultValue={settings?.maxBookingLength}
          disabled={isUpdatingSettings}
          {...register("maxBookingLength", {
            required: "This is required",
            min: { value: 1, message: "Maximum nights should larger than 0" },
          })}
        />
      </FormRow>
      <FormRow
        label="Maximum guests/booking"
        error={errors?.maxGuestsPerBooking?.message}
      >
        <Input
          type="number"
          id="maxGuestsPerBooking"
          defaultValue={settings?.maxGuestsPerBooking}
          disabled={isUpdatingSettings}
          {...register("maxGuestsPerBooking", {
            required: "This is required",
            min: { value: 1, message: "Maximum guests should larger than 0" },
          })}
        />
      </FormRow>
      <FormRow label="Breakfast price" error={errors?.breakfastPrice?.message}>
        <Input
          type="number"
          id="breakfastPrice"
          defaultValue={settings?.breakfastPrice}
          disabled={isUpdatingSettings}
          {...register("breakfastPrice", {
            required: "This is required",
            min: { value: 1, message: "Breakfast price should larger than 0" },
          })}
        />
      </FormRow>
      <FormRow>
        <Button type="submit" disabled={isUpdatingSettings}>
          Update Settings
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
