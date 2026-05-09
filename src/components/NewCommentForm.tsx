import classNames from 'classnames';
import React from 'react';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  NewCommentFormState,
  setFieldError,
  setFieldValue,
  clearForm,
  setSubmitting,
} from '../features/newCommentFormSlice';

type Props = {
  onSubmit: (data: CommentData) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const { submitting, errors, values } = useAppSelector(
    state => state.newCommentForm,
  );
  const { name, email, body } = values;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name: fieldName, value } = e.target;

    dispatch(
      setFieldValue({
        field: fieldName as keyof NewCommentFormState['values'],
        value,
      }),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasErrors = false;

    if (!name.trim()) {
      dispatch(setFieldError('name'));
      hasErrors = true;
    }

    if (!email.trim()) {
      dispatch(setFieldError('email'));
      hasErrors = true;
    }

    if (!body.trim()) {
      dispatch(setFieldError('body'));
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    dispatch(setSubmitting(true));
    try {
      await onSubmit({ name, email, body });
      dispatch(clearForm());
    } catch (err) {
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={() => dispatch(clearForm())}
      data-cy="NewCommentForm"
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': errors.name })}
            value={values.name}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': errors.email })}
            value={values.email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': errors.body })}
            value={values.body}
            onChange={handleChange}
          />
        </div>

        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': submitting,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
