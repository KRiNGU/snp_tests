import DropDown from '@components/DropDown/DropDown';
import Input from '@components/Input/Input';
import { memo, useCallback } from 'react';
import styles from './TestsList.module.css';
import { sortByParameter } from '@utils/utils';
import { validateInputQuestion } from '@utils/errorCodes';

const TestsList = ({
  answers = [],
  questions = [],
  onDeleteQuestion,
  onDeleteAnswer,
  onAddAnswer,
  onEditAnswer,
  onEditQuestionName,
  onToggleRightAnswer,
  onChangeAnswersOrder,
  isMobile = false,
}) => {
  const handleEditAnswer = useCallback(
    ({ id, value, isValid = true }) => {
      onEditAnswer({ aId: id, name: value, isValid });
    },
    [onEditAnswer]
  );

  const handleAddAnswer = useCallback(
    ({ qId, order }) => {
      onAddAnswer({ qId, aId: Date.now(), order });
    },
    [onAddAnswer]
  );

  const handleEditQuestionName = useCallback(
    ({ id, value }) => {
      onEditQuestionName({ qId: id, name: value });
    },
    [onEditQuestionName]
  );

  const handleToggleRightAnswer = useCallback(
    ({ dropDownId, newSelected }) => {
      onToggleRightAnswer({
        qId: dropDownId,
        newRightAnswerId: newSelected,
      });
    },
    [onToggleRightAnswer]
  );

  const handleChangeDropDownElement = useCallback(
    ({ dropDownElementId, value }) => {
      onEditAnswer({
        aId: dropDownElementId,
        name: value,
        isValid: true,
      });
    },
    [onEditAnswer]
  );

  const handleDeleteAnswer = useCallback(
    ({ aId, qId }) => {
      const answersOfParentQuestion = answers.filter(
        (answer) => answer.questionId === qId
      );
      if (answersOfParentQuestion.length > 2) {
        onDeleteAnswer(aId);
      }
    },
    [onDeleteAnswer, answers]
  );

  const handleDeleteQuestion = useCallback(
    (qId) => {
      onDeleteQuestion(qId);
    },
    [onDeleteQuestion]
  );

  const handleChangeAnswersOrder = useCallback(
    ({ aId, newOrder, qId, oldOrder }) => {
      onChangeAnswersOrder({ aId, newOrder, qId, oldOrder });
    },
    [onChangeAnswersOrder]
  );

  return (
    <div className={styles.testsContainer}>
      {questions.map((question) => {
        return typeof question?.rightAnswerId === 'number' ? (
          <Input
            key={question.id}
            id={question.rightAnswerId}
            inputText={question.name}
            inputLabel={styles.inputLabel}
            container={styles.inputContainer}
            placeholder="Введите ответ"
            validator={validateInputQuestion}
            input={styles.input}
            value={
              answers.find((answer) => question.rightAnswerId === answer.id)
                ?.name
            }
            onChange={handleEditAnswer}
            onEditInputName={({ value }) =>
              handleEditQuestionName({ id: question.id, value })
            }
            onDelete={() => handleDeleteQuestion(question.id)}
            giveFocus
            isChangeable
          />
        ) : (
          <DropDown
            key={question.id}
            dropDownId={question.id}
            title={question.name}
            list={sortByParameter(
              answers.filter((answer) => answer.questionId === question.id),
              'order'
            )}
            defaultSelected={question.rightAnswerId}
            onSelect={handleToggleRightAnswer}
            onChangeElement={handleChangeDropDownElement}
            className={{ container: styles.dropDownContainer }}
            onDelete={handleDeleteQuestion}
            onDeleteElement={(aId) =>
              handleDeleteAnswer({ aId, qId: question.id })
            }
            onDragEnd={handleChangeAnswersOrder}
            onAddElement={handleAddAnswer}
            onEditName={handleEditQuestionName}
            isMobile={isMobile}
            isChangeable
          />
        );
      })}
    </div>
  );
};

export default memo(TestsList);
