import { Button, TextInput } from "flowbite-react";
import { Season } from "../../../types";
import {
  meetingCreateSchema,
  MeetingCreateValues,
} from "../../../models/meetingSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { fetchPost } from "../../../hooks/fetchPost";

export default function NewMeetingForm({
  season,
  fetchData,
}: {
  season: Season;
  fetchData: () => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MeetingCreateValues>({
    resolver: zodResolver(meetingCreateSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<MeetingCreateValues> = async (data) => {
    data.seasonId = season.id;
    data.date = new Date(data.date).toISOString();
    const response = await fetchPost("/meetings", data);
    if (response.ok) {
      fetchData();
      document.getElementById("submitBtn")?.click();
    }
  };
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-4">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
            Registrar reunión
          </h3>

          <div>
            <label htmlFor="date">Fecha *</label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <TextInput
                  id="date"
                  type="date"
                  {...field}
                  className={`${errors.date ? "text-red-900" : ""}`}
                />
              )}
            />
            <div className="h-4">
              {errors.date && (
                <p className="text-red-900">{errors.date.message}</p>
              )}
            </div>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            Todos los campos con * son obligatorios.
          </div>

          <div className="flex w-full items-center justify-end gap-4">
            <Button type="button" onClick={handleSubmit(onSubmit)}>
              Guardar datos
            </Button>
            <button hidden type="submit" id="submitBtn"></button>
          </div>
        </div>
      </form>
    </>
  );
}
