"use client";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, TextField } from "@radix-ui/themes";

const NewIssuePage = () => {
  return (
    <div>
      <form className="space-y-3">
        <TextField.Root>
          <TextField.Input placeholder="Title" />
        </TextField.Root>
        <SimpleMDE />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
