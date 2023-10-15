"use client";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";

const NewIssuePage = () => {
  const { register, handleSubmit, control } = useForm();

  return (
    <div>
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (values) => {
          console.log(values);
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
