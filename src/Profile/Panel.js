import styled from "@emotion/styled";

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  background-color: #fff;
  width: 480px;
  border-radius: 30px;

  padding: 30px;
  input {
    height: 24px;
    border-radius: 20px;
    padding: 0 15px;
  }
  textarea {
    height: 50px;
    border-radius: 20px;
    padding: 0 15px;
  }
`;

export const FormGroup = styled.div`
  width: 350px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  label {
    font-weight: 600;
  }
`;
