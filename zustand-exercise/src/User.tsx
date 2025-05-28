import React from "react";
import { useUserStore } from "./user.store";

const User: React.FC = () => {
    const users = useUserStore((state) => state.users);
    const deleteUser = useUserStore((state) => state.deleteUser);
    const addUser = useUserStore((state) => state.addUser);

    const [form, setForm] = React.useState({
        firstname: "",
        lastname: "",
        age: "",
        hobbies: [] as string[],
    });

    const hobbiesList = [
        "Reading",
        "Sports",
        "Music",
        "Travel",
        "Gaming",
        "Cooking",
        "Art",
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addUser({ ...form, age: Number(form.age) });
        setForm({ firstname: "", lastname: "", age: "", hobbies: [] });
    };

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.length === 0 && <li>No users found.</li>}
                {users.map((user, idx) => (
                    <li key={idx}>
                        {user.firstname} {user.lastname} (Age: {user.age})<br />
                        Hobbies: {user.hobbies.join(", ")}
                        <button
                            onClick={() => deleteUser(idx)}
                            style={{ marginLeft: 8 }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <form style={{ marginTop: 24 }} onSubmit={handleSubmit}>
                <div>
                    <label>Firstname: </label>
                    <input
                        type="text"
                        value={form.firstname}
                        onChange={(e) =>
                            setForm((f) => ({
                                ...f,
                                firstname: e.target.value,
                            }))
                        }
                        required
                    />
                </div>
                <div>
                    <label>Lastname: </label>
                    <input
                        type="text"
                        value={form.lastname}
                        onChange={(e) =>
                            setForm((f) => ({ ...f, lastname: e.target.value }))
                        }
                        required
                    />
                </div>
                <div>
                    <label>Age: </label>
                    <input
                        type="number"
                        value={form.age}
                        onChange={(e) =>
                            setForm((f) => ({ ...f, age: e.target.value }))
                        }
                        required
                        min={0}
                    />
                </div>
                <div>
                    <label>Hobbies:</label>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 8,
                            marginTop: 8,
                        }}
                    >
                        {hobbiesList.map((hobby) => (
                            <label key={hobby} style={{ marginRight: 12 }}>
                                <input
                                    type="checkbox"
                                    checked={form.hobbies.includes(hobby)}
                                    onChange={(e) => {
                                        setForm((f) => {
                                            if (e.target.checked) {
                                                return {
                                                    ...f,
                                                    hobbies: [
                                                        ...f.hobbies,
                                                        hobby,
                                                    ],
                                                };
                                            } else {
                                                return {
                                                    ...f,
                                                    hobbies: f.hobbies.filter(
                                                        (h) => h !== hobby
                                                    ),
                                                };
                                            }
                                        });
                                    }}
                                />
                                {hobby}
                            </label>
                        ))}
                    </div>
                </div>
                <button type="submit" style={{ marginTop: 12 }}>
                    Add User
                </button>
            </form>
        </div>
    );
};

export default User;
