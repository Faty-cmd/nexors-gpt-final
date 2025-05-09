import Header from "../components/Header";
import TaskDemo from "../components/TaskDemo";
import UpgradeBox from "../components/UpgradeBox";

export default function Home() {
  return (
    <div style={{ fontFamily: "Arial", padding: "2rem" }}>
      <Header />
      <TaskDemo />
      <UpgradeBox />
    </div>
  );
}