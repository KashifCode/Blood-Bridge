"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { ZodType } from "zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { axiosInstance as axios } from "@/app/axios-api/axios";
import { createNewEvent } from "@/app/axios-api/Endpoint";
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
  eventDate?: string;
  eventTime: string;
  image?: any;
}

const AddNewEvent = () => {
  const allEvents = useBBSelector((state) => state.allEvents.value.events);
  const dispatch = useDispatch();

  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [image, setImage] = React.useState<any>(undefined);

  const schema: ZodType<newEventInterface> = z.object({
    eventName: z.string(),
    description: z.string().min(1, "Description is required"),
    guests: z.string().min(1, "Guests is required"),
    venue: z.string().min(1, "Venue is required"),
    eventDate: z.string().optional(),
    eventTime: z.string().min(1, "Time is required"),
    image: z.any().optional(),
  });

  const form = useForm<newEventInterface>({
    resolver: zodResolver(schema),
  });

  const handleNewEvent = (data: newEventInterface, e: any) => {
    data.eventDate = date?.toISOString();

    if (!image) {
      toast.error("Image is required");
      return;
    }

    data.image = image?.[0]?.url;
    const guestList = data.guests.split(",");
    data.guests = guestList;
    data.guests.forEach((guest: string, index: number) => {
      data.guests[index] = guest.trimStart();
    });

    const url = createNewEvent();
    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res?.data);
        const newEvent = res?.data?.event;
        if (newEvent) {
          dispatch(
            updateAllEvents({ events: [...allEvents, newEvent] } as any),
          );
          toast.success(res?.data?.message);
          form.reset();
          e.target.reset();
          setDate(undefined);
          setImage(undefined);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  useEffect(() => {
    const errors = form.formState.errors;
    const allErrors = Object.values(errors);
    allErrors.map((error) => (console.log(error), notifyError(error?.message)));
  }, [form.formState.errors]);

  const notifyError = (errorMessage: any) => {
    toast.error(errorMessage);
  };

  return (
    <div className="w-full px-[5%]">
      <h1 className="text-2xl font-bold pb-1.5">Event Details</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleNewEvent)}
          className="space-y-4"
        >
          {/* Name */}
          <FormField
            control={form.control}
            name="eventName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="bg-[#E9DFDF]"
                    placeholder="Event Name"
                    {...field}
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={3}
                    style={{ resize: "none" }}
                    className={`bg-[#E9DFDF]`}
                    placeholder="Event Description"
                    {...field}
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />

          {/* Guests */}
          <FormField
            control={form.control}
            name="guests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guests</FormLabel>
                <FormControl>
                  <Input
                    className="bg-[#E9DFDF]"
                    placeholder="Guests Names seperated by ,"
                    {...field}
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />

          {/* Venue */}
          <FormField
            control={form.control}
            name="venue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Venue</FormLabel>
                <FormControl>
                  <Input
                    className="bg-[#E9DFDF]"
                    placeholder="Venue"
                    {...field}
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />

          {/* Date */}
          <FormField
            control={form.control}
            name="eventDate"
            render={() => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-[#E9DFDF]",
                          !date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />

          {/* Time */}
          <FormField
            control={form.control}
            name="eventTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    className="bg-[#E9DFDF]"
                    placeholder="Time"
                    accept="image/*"
                    {...field}
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />

          {/* Image */}
          <div>
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
              endpoint="serverImage"
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
                <strong>Selected File:</strong> {image?.[0]?.name}
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
      </Form>
    </div>
  );
};

export default AddNewEvent;
