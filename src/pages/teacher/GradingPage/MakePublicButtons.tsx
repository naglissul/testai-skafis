import { onValue, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../../services/firebaseConfig";
import { useAuth } from "../../../context/AuthContext";
import { Grade } from "../../../utils/TYPES";

const MakePublicButtons: React.FC<{ testCode: string }> = ({ testCode }) => {
  const { currentUser } = useAuth();
  const [isGradesAccessible, setIsGradesAccessible] = useState<boolean>(false);
  const [isShowOnlyGrade, setIsShowOnlyGrade] = useState<boolean>(false);
  const [grades, setGrades] = useState<Grade[]>([]);

  useEffect(() => {
    onValue(
      ref(
        database,
        "users/" +
          currentUser?.email?.replace(/\./g, "?") +
          "/tests/" +
          testCode +
          "/grading/grades"
      ),
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setGrades(data);

          if (isGradesAccessible && !isShowOnlyGrade) {
            set(ref(database, "accessibleGrades/" + testCode), {
              writerEmail: currentUser?.email,
              grades: data,
            });
          } else if (isGradesAccessible && isShowOnlyGrade) {
            set(ref(database, "accessibleGrades/" + testCode), {
              writerEmail: currentUser?.email,
              grades: data.map((grade: any) => {
                return {
                  student: grade.student || "",
                  grade: grade.grade,
                  points: grade.points,
                  outOf: grade.outOf,
                  additionalPoints: grade.additionalPoints,
                  outOfAdditional: grade.outOfAdditional,
                  teacherComment: grade.teacherComment,
                };
              }),
            });
          }
        }
      }
    );
    onValue(
      ref(
        database,
        "users/" +
          currentUser?.email?.replace(/\./g, "?") +
          "/tests/" +
          testCode +
          "/grading/isGradesAccessible"
      ),
      (snapshot) => {
        const data = snapshot.val();
        setIsGradesAccessible(data);
      }
    );
    onValue(
      ref(
        database,
        "users/" +
          currentUser?.email?.replace(/\./g, "?") +
          "/tests/" +
          testCode +
          "/grading/isShowOnlyGrade"
      ),
      (snapshot) => {
        const data = snapshot.val();
        setIsShowOnlyGrade(data);
      }
    );
  }, []);

  const makeGradesPublic = () => {
    const accessibleGrades = {
      writerEmail: currentUser?.email,
      grades: grades.map((grade: any) => {
        return {
          student: grade.student || "",
          grade: grade.grade,
          points: grade.points,
          outOf: grade.outOf,
          additionalPoints: grade.additionalPoints,
          outOfAdditional: grade.outOfAdditional,
          teacherComment: grade.teacherComment,
        };
      }),
    };
    set(
      ref(
        database,
        "users/" +
          currentUser?.email?.replace(/\./g, "?") +
          "/tests/" +
          testCode +
          "/grading/isShowOnlyGrade"
      ),
      true
    );
    set(
      ref(
        database,
        "users/" +
          currentUser?.email?.replace(/\./g, "?") +
          "/tests/" +
          testCode +
          "/grading/isGradesAccessible"
      ),
      true
    );
    set(ref(database, "accessibleGrades/" + testCode), accessibleGrades).then(
      () => {
        alert("Sėkmingai paviešinti tik pažymiai.");
      }
    );
  };

  const makeAllGradingPublic = () => {
    const accessibleGrades = {
      writerEmail: currentUser?.email,
      grades: grades,
    };
    set(
      ref(
        database,
        "users/" +
          currentUser?.email?.replace(/\./g, "?") +
          "/tests/" +
          testCode +
          "/grading/isShowOnlyGrade"
      ),
      false
    );
    set(
      ref(
        database,
        "users/" +
          currentUser?.email?.replace(/\./g, "?") +
          "/tests/" +
          testCode +
          "/grading/isGradesAccessible"
      ),
      true
    );
    set(ref(database, "accessibleGrades/" + testCode), accessibleGrades).then(
      () => {
        alert("Sėkmingai paviešinti visi vertinimai.");
      }
    );
  };

  const makeAllGradingPrivate = () => {
    set(
      ref(
        database,
        "users/" +
          currentUser?.email?.replace(/\./g, "?") +
          "/tests/" +
          testCode +
          "/grading/isGradesAccessible"
      ),
      false
    );
    set(
      ref(
        database,
        "users/" +
          currentUser?.email?.replace(/\./g, "?") +
          "/tests/" +
          testCode +
          "/grading/isShowOnlyGrade"
      ),
      false
    );
    remove(ref(database, "accessibleGrades/" + testCode)).then(() => {
      alert("Sėkmingai užprivatinti visi vertinimai.");
    });
  };

  return (
    <div>
      {isGradesAccessible ? (
        <div>
          <h2>Vertinimai paviešinti.</h2>{" "}
          {isShowOnlyGrade ? (
            <h2>Mokiniams rodoma tik pažymiai</h2>
          ) : (
            <h2>
              Mokiniams rodoma atskirų užduočių vertinimas teisingais
              atsakymais.
            </h2>
          )}
        </div>
      ) : (
        <h2 className="text-green-600">Vertinimai nepaviešinti.</h2>
      )}

      <div className="flex gap-2">
        {(!isGradesAccessible || !isShowOnlyGrade) && (
          <button className="w-1/2" onClick={makeGradesPublic}>
            Viešinti tik pažymius
          </button>
        )}
        {(!isGradesAccessible || isShowOnlyGrade) && (
          <button
            className="w-1/2 bg-green-500 hover:bg-green-700"
            onClick={makeAllGradingPublic}
          >
            Viešinti įvertinimus su atsakymais
          </button>
        )}
        {isGradesAccessible && (
          <button
            className="w-1/2 bg-red-600 hover:bg-red-800"
            onClick={makeAllGradingPrivate}
          >
            Užprivatinti įvertinimus
          </button>
        )}
      </div>
    </div>
  );
};

export default MakePublicButtons;
