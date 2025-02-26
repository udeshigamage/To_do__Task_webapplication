import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import CommonLoading from "./Util/Commonloading";
import axios from "axios";
import Confirmationmodel from "./Util/Confirmationmodel";
import { toast } from "react-toastify";
import * as Yup from "yup";

const API_URL = import.meta.env.VITE_API_URL;
const Todotask = () => {
  const [isloading, setisloading] = useState(false);
  const [data, setdata] = useState<any[]>([]);

  const [ismodelopen, setismodelopen] = useState(false);
  const [item, setitem] = useState<any>(null);
  const pageSize = 5;

  const handlemodelopen = (item: any) => {
    setismodelopen(true);
    setitem(item);
  };
  const handlemodelclose = () => {
    setismodelopen(false);
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  });
  const handleedit = async () => {
    console.log("clicked");
    console.log(item);
    setisloading(true);
    try {
      await axios.put(`${API_URL}/Task_to_do/${item?.task_ID}`, {
        task_title: item?.task_title || "",
        task_description: item?.task_description || "",
        iscompleted: true,
        addeddatetime: new Date().toISOString().slice(0, 19),
      });
      toast.success("Updated Successfully");

      fetchtask();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setTimeout(() => {
        setisloading(false);
      }, 1000);

      setismodelopen(false);
    }
  };
  const fetchtask = async () => {
    setisloading(true);
    try {
      const response = await axios.get(
        `${API_URL}/Task_to_do?page=1&pageSize=${pageSize}`
      );

      setdata(response.data.data);
    } catch (error) {
    } finally {
      setTimeout(() => {
        setisloading(false);
      }, 1000);
    }
  };
  useEffect(() => {
    fetchtask();
  }, []);

  return (
    <div>
      <div className="flex flex-row ">
        <div className="basis-1/2">
          <Formik
            initialValues={{
              task_id: "",
              title: "",
              description: "",
              createdDate: "",
              isCompleted: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              setisloading(true);
              try {
                await axios.post(`${API_URL}/Task_to_do`, {
                  task_title: values?.title,
                  task_description: values?.description,
                  iscompleted: false,
                  addeddatetime: new Date().toISOString().slice(0, 19),
                });
                toast.success("Added Successfully");
                resetForm();

                fetchtask();
              } catch (error) {
                toast.error("Something went wrong");
              } finally {
                setTimeout(() => {
                  setisloading(false);
                }, 1000);
              }
            }}
          >
            {({ getFieldProps, isValid, errors, touched }) => (
              <Form>
                <div className="flex flex-col gap-3 bg-slate-700 border-red-200 border-4 m-8 p-5  rounded-3xl w-[600px] h-[400px]">
                  <div className="flex flex-row justify-center items-center">
                    {" "}
                    <h1 className="text-3xl mb-2 text-white">Add Task</h1>
                  </div>

                  <input
                    type="text"
                    {...getFieldProps("title")}
                    className="w-[500px] ml-5 rounded-lg p-2"
                    placeholder="Title"
                  />
                  {errors.title && touched.title && (
                    <p className="text-red-500">{errors.title}</p>
                  )}

                  <textarea
                    {...getFieldProps("description")}
                    className="w-[500px] ml-5 rounded-lg p-2"
                    placeholder="Description "
                  />
                  {errors.description && touched.description && (
                    <p className="text-red-500">{errors.description}</p>
                  )}
                  <div className="flex flex-row justify-end">
                    {" "}
                    <button
                      type="submit"
                      className="bg-white text-black px-4 p-2 w-[100px] rounded-lg"
                      disabled={!isValid}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="basis-1/2">
          {data.map((item, index) => (
            <div
              className="flex flex-col  bg-slate-700 m-8  gap-5 text-white  rounded-lg w-[800px] h-[117px]"
              key={item.task_id}
            >
              <div className="flex flex-row justify-start m-2">
                {" "}
                <h1 className="text-2xl text-white">{item.task_title}</h1>{" "}
              </div>
              <div className="flex flex-row justify-between ">
                <div className="ml-2 mb-2">
                  <h1 className="text-lg">{item.task_description}</h1>
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={() => {
                      handlemodelopen(item);
                    }}
                    className="bg-white text-black px-4 p-2 w-[100px] rounded-lg mr-2 mb-2"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {ismodelopen && (
        <Confirmationmodel
          handlemodelclose={handlemodelclose}
          handledit={handleedit}
        />
      )}
      {isloading && <CommonLoading />}
    </div>
  );
};

export default Todotask;
