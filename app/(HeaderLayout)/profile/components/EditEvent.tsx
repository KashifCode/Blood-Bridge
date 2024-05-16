"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { ZodType } from "zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance as axios } from "@/app/axios-api/axios";
import { modifyEvent } from "@/app/axios-api/Endpoint";
import { UploadButton } from "@/lib/uploadthing";
import { Label } from "@/components/ui/label";
import { useBBSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { updateAllEvents } from "@/redux/features/allEvents";

interface newEventInterface {
  eventName: string;
  description: string;
  guests: any;
  venue: string;
  eventDate: string;
  eventTime: string;
  image?: any;
}

const EditEvent = ({
  eventToEdit,
  handleAddEvent,
}: {
  eventToEdit: any;
  handleAddEvent: () => void;
}) => {
  const allEvents = useBBSelector((state) => state.allEvents.value.events);
  const dispatch = useDispatch();

  const [image, setImage] = React.useState<any>(undefined);

  const schema: ZodType<newEventInterface> = z.object({
    eventName: z.string(),
    description: z.string().min(1, "Description is required"),
    guests: z.string().min(1, "Guests is required"),
    venue: z.string().min(1, "Venue is required"),
    eventDate: z.string().min(1, "Date is required"),
    eventTime: z.string().min(1, "Time is required"),
    image: z.any().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<newEventInterface>({
    resolver: zodResolver(schema),
  });

  const handleNewEvent = (data: newEventInterface, e: any) => {
    console.log(data);
    data.eventDate = new Date(data.eventDate).toISOString();

    if (!image && eventToEdit?.image === "") {
      toast.error("Image is required");
      return;
    }

    if (image) {
      data.image = image?.[0]?.url;
    } else {
      data.image = eventToEdit?.image;
    }

    const guestList = data.guests.split(",");
    data.guests = guestList;
    data.guests.forEach((guest: string, index: number) => {
      data.guests[index] = guest.trimStart();
    });

    const url = modifyEvent() + `?id=${eventToEdit._id}`;

    let newEditedEvent = {
      ...allEvents?.filter((event) => event._id === eventToEdit._id)[0],
      ...data,
    };

    axios
      .put(url, data, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(
          updateAllEvents({
            events: [
              ...allEvents?.filter((event) => event._id !== eventToEdit._id),
              newEditedEvent,
            ],
          } as any),
        );
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  useEffect(() => {
    const allErrors = Object.values(errors);
    allErrors.map((error) => (console.log(error), notifyError(error?.message)));
  }, [errors]);

  const notifyError = (errorMessage: any) => {
    toast.error(errorMessage);
  };

  const handleDisplayGuests = () => {
    let guests = "";
    eventToEdit?.guests.forEach((guest: string, index: number) => {
      if (index === eventToEdit?.guests.length - 1) {
        guests += guest;
      } else {
        guests += guest + ", ";
      }
    });
    return guests;
  };

  return (
    <div className="w-full px-[5%]">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold pb-1.5">Event Details</h1>
        <Button
          className="bg-red-700 hover:bg-red-700 rounded-full text-white !h-auto !py-2 !px-5"
          onClick={() => handleAddEvent()}
        >
          Add Event
        </Button>
      </div>
      <form onSubmit={handleSubmit(handleNewEvent)} className="space-y-4">
        {/* Name */}
        <div className="flex flex-col space-y-2">
          <Label>Event Name</Label>
          <Input
            type="text"
            {...register("eventName")}
            defaultValue={eventToEdit?.eventName}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col space-y-2">
          <Label>Event Name</Label>
          <Textarea
            rows={3}
            style={{ resize: "none" }}
            className={`bg-[#E9DFDF]`}
            placeholder="Event Description"
            {...register("description")}
            defaultValue={eventToEdit?.description}
          />
        </div>

        {/* Guests */}
        <div className="flex flex-col space-y-2">
          <Label>Guests</Label>
          <Input
            type="text"
            className="bg-[#E9DFDF]"
            placeholder="Guests Names seperated by ,"
            {...register("guests")}
            defaultValue={handleDisplayGuests()}
          />
        </div>

        {/* Venue */}
        <div className="flex flex-col space-y-2">
          <Label>Venue</Label>
          <Input
            type="text"
            className="bg-[#E9DFDF]"
            placeholder="Venue"
            {...register("venue")}
            defaultValue={eventToEdit?.venue}
          />
        </div>

        {/* Date */}
        <div className="flex flex-col space-y-2">
          <Label>Date</Label>
          <Input
            type="date"
            className="bg-[#E9DFDF]"
            placeholder="Date"
            {...register("eventDate")}
            defaultValue={new Date(eventToEdit?.eventDate)
              ?.toISOString()
              ?.substring(0, 10)}
          />
        </div>

        {/* Time */}
        <div className="flex flex-col space-y-2">
          <Label>Time</Label>
          <Input
            type="time"
            className="bg-[#E9DFDF]"
            placeholder="Time"
            {...register("eventTime")}
            defaultValue={eventToEdit?.eventTime}
          />
        </div>

        {/* Image */}
        <div className="flex flex-col space-y-2">
          <Label className="!mb-2">Image</Label>
          <UploadButton
            className="bg-[#E9DFDF] text-sm text-black !justify-between rounded-md uploadThingBtn"
            appearance={{
              container: {
                width: "100%",
                backgroundColor: "#E9DFDF",
              },
              button: {
                padding: "1rem 1rem",
                justifyContent: "space-between",
                width: "100%",
                backgroundColor: "#E9DFDF",
                color: "#000000",
              },
            }}
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImage(res);
              toast.success("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              toast.error(`ERROR! ${error.message}`);
            }}
          />
          {image && (
            <p className="text-sm text-black mt-2">
              <strong>Selected File:</strong>{" "}
              {image ? image?.[0]?.name : eventToEdit.image}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            className="bg-red-700 hover:bg-red-700 rounded-full text-white !h-auto !py-2 !px-5"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditEvent;
