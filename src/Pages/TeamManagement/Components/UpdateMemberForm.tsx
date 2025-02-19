import { Button, Select } from "flowbite-react";
import { Membership, Team } from "../../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { fetchPut } from "../../../hooks/fetchPut";
import {
  teamMembershipSchema,
  TeamMembershipValues,
} from "../../../models/teamMembership";
import { useFetch } from "../../../hooks/useFetch";
import { Loader } from "../../../Components/Loader";

export default function UpdateTeamMembership({
  team,
  membership,
  fetchMembers,
}: {
  team: Team;
  membership: Membership;
  fetchMembers: () => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamMembershipValues>({
    resolver: zodResolver(teamMembershipSchema),
    mode: "onBlur",
  });

  const { data, loading } = useFetch<Team[]>(`/seasons/${team.seasonId}/teams`);
  const teams = data ? data : [];
  if (loading) return <Loader />;

  const onSubmit: SubmitHandler<TeamMembershipValues> = async (data) => {
    const response = await fetchPut("/teamMemberships/" + membership.id, data);
    if (response.ok) {
      fetchMembers();
      document.getElementById("submitBtn")?.click();
    }
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-4">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
            Mover a {membership.teen.firstName} {membership.teen.lastName}
          </h3>
          <div>
            <label htmlFor="teamId">equipos</label>
            <Controller
              name="teamId"
              control={control}
              render={({ field }) => (
                <Select id={"teamId"} {...field}>
                  <option>none</option>
                  {teams.map((team: Team) => (
                    <option value={team.id}>{team.name}</option>
                  ))}
                </Select>
              )}
            />
            <div className="h-4">
              {errors.teamId && (
                <p className="text-red-900">{errors.teamId.message}</p>
              )}
            </div>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            Todos los campos con * son obligatorios.
          </div>

          <div className="flex w-full items-center justify-end gap-4">
            <Button type="button" onClick={handleSubmit(onSubmit)}>
              Mover equipo
            </Button>
            <button hidden type="submit" id="submitBtn"></button>
          </div>
        </div>
      </form>
    </>
  );
}
