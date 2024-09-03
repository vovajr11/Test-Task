import { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useAuth } from "../../hooks";
import { IRepo } from "../../interfaces/github.interface";
import {
  deleteProjectsById,
  getProjectsByUserId,
  saveProject,
} from "../../api/project";

type FieldType = {
  repoPath: string;
};

const repoFormat = /^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/;

const HomePage = () => {
  const { logout, user } = useAuth();
  const [form] = Form.useForm();
  const [userRepositories, setUserRepositories] = useState<IRepo[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjectsByUserId(user._id);
        setUserRepositories(response);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchProjects();
  }, []);

  const onFinish: FormProps<FieldType>["onFinish"] = async ({ repoPath }) => {
    const newProject = await saveProject(repoPath, user._id);

    if (newProject?._id) {
      form.resetFields();

      setUserRepositories((prev) =>
        prev ? [...prev, newProject] : [newProject]
      );
    }
  };

  const onDeleteProject = async (id: string) => {
    const res = await deleteProjectsById(id);

    if (res._id) {
      setUserRepositories((prev) =>
        prev ? prev.filter((repo) => repo._id !== id) : prev
      );
    }
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>

      <h2 className="text-black my-4">Welcome {user.email}!</h2>

      <section>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Path to the repository"
            name="repoPath"
            rules={[
              {
                required: true,
                message: "Please input valid path!",
                pattern: repoFormat,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </section>

      <section>
        {isLoading && <h2>Loading...</h2>}
        {!isLoading && (
          <ul className="space-y-4 px-5">
            {userRepositories && userRepositories.length > 0 ? (
              <>
                {userRepositories.map((el) => {
                  return (
                    <li
                      key={el._id}
                      className="text-black border border-gray-300"
                    >
                      {Object.entries(el).map(([key, value]) => (
                        <div key={key}>
                          <strong>{key}:</strong> {value}
                        </div>
                      ))}
                      <Button
                        type="primary"
                        onClick={() => onDeleteProject(el._id)}
                      >
                        Delete
                      </Button>
                    </li>
                  );
                })}
              </>
            ) : (
              <h2 className="text-black">Empty</h2>
            )}
          </ul>
        )}
      </section>
    </div>
  );
};

export default HomePage;
