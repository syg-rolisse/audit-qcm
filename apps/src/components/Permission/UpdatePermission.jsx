import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosConfig";
import { SocketContext } from "../../context/socket";

function UpdatePermission({
  currentPermissionId,
  forceUpdate,
  refreshPermissionList,
}) {
  const [currentPermission, setCurrentPermission] = useState();
  const prevPermissionIdRef = useRef();
  const addPermissionLinkRef = useRef();
  const user = JSON.parse(localStorage.getItem("user"));

  const socket = useContext(SocketContext);

  const { register, handleSubmit, reset } = useForm();

  const handleError = (error) => {
    const validationErrors = error?.response?.data?.error;
    if (validationErrors && Array.isArray(validationErrors)) {
      validationErrors.forEach((err) => {
        toast.error(err.message, { duration: 12000 });
      });
    } else {
      addPermissionLinkRef.current.click();
      toast.error(error?.response?.data?.error, { duration: 12000 });
    }
  };

  const updatePermission = useMutation(
    ({ data, currentPermissionId }) =>
      axiosInstance.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/permission?userConnectedId=${
          user.id
        }&permissionId=${currentPermissionId}`,
        data
      ),
    {
      onSuccess: (response) => {
        socket.emit("user_updated");
        toast.success(response?.data?.message);
        refreshPermissionList();
        reset();
        addPermissionLinkRef.current.click();
      },
      onError: handleError,
    }
  );

  const getPermission = useMutation(
    (param) =>
      axiosInstance.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/permission?permissionId=${
          param.currentPermissionId
        }`
      ),
    {
      onSuccess: (response) => {
        setCurrentPermission(response?.data?.permission);
      },
      onError: handleError,
    }
  );

  const onSubmit = (data) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      console.log(data);

      if (currentPermissionId) {
        updatePermission.mutate({ data, currentPermissionId });
      }
    } else {
      toast.error("Utilisateur non trouvé dans le stockage local");
    }
  };

  useEffect(() => {
    if (currentPermissionId) {
      prevPermissionIdRef.current = currentPermissionId;
      getPermission.mutate({ currentPermissionId });
      if (addPermissionLinkRef.current) {
        addPermissionLinkRef.current.click();
      }
    }
  }, [currentPermissionId, forceUpdate]);

  useEffect(() => {
    if (currentPermission) {
      reset({
        profilId: currentPermission?.Profil?.id,
        readUser: currentPermission?.readUser || false,
        createUser: currentPermission?.createUser || false,
        updateUser: currentPermission?.updateUser || false,
        deleteUser: currentPermission?.deleteUser || false,
        readDomaine: currentPermission?.readDomaine || false,
        createDomaine: currentPermission?.createDomaine || false,
        updateDomaine: currentPermission?.updateDomaine || false,
        deleteDomaine: currentPermission?.deleteDomaine || false,
        readTest: currentPermission?.readTest || false,
        createTest: currentPermission?.createTest || false,
        updateTest: currentPermission?.updateTest || false,
        deleteTest: currentPermission?.deleteTest || false,
        readThematique: currentPermission?.readThematique || false,
        createThematique: currentPermission?.createThematique || false,
        updateThematique: currentPermission?.updateThematique || false,
        deleteThematique: currentPermission?.deleteThematique || false,

        updatePermission: currentPermission?.updatePermission || false,
        readPermission: currentPermission?.readPermission || false,
      });
    }
  }, [currentPermission, reset]);

  useEffect(() => {
    if (socket) {
      socket.on("user_updated", refreshPermissionList);
      return () => {
        socket.off("user_updated", refreshPermissionList);
      };
    }
  }, [socket, refreshPermissionList]);

  return (
    <div className="row">
      <a
        ref={addPermissionLinkRef}
        className="modal-effect btn btn-primary d-grid mb-3"
        data-bs-effect="effect-rotate-bottom"
        data-bs-toggle="modal"
        href="#modaldemo8"
        style={{ cursor: "pointer", visibility: "hidden" }}
        disabled
      >
        Modification de la permission
      </a>

      <div
        className="modal fade"
        id="modaldemo8"
        tabIndex="-1"
        data-bs-backdrop="static"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content tw-rounded-lg tw-border tw-p-2">
            <div className="modal-header">
              <h6 className="modal-title tw-text-gray-700 tw-text-xl">
                Modification
              </h6>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ cursor: "pointer" }}
              ></button>
            </div>
            <div className="modal-body text-start">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="row gy-4 formCustom"
              >
                {/* Utilisateurs accès */}
                <div className="tw-border tw-p-4 tw-rounded-lg mb-4">
                  <h6 className="text-xl font-semibold mb-3">
                    Permissions sur les accès
                  </h6>

                  <input
                    type="number"
                    className="form-control tw-absolute tw-top-0 tw-hidden"
                    id="profilId"
                    {...register("profilId")}
                  />

                  <div className="form-check tw-flex tw-justify-start">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="readPermission"
                      {...register("readPermission")}
                    />
                    <label
                      className="form-check-label tw-ml-2"
                      htmlFor="readPermission"
                    >
                      Lire les permissions
                    </label>
                  </div>
                  <div className="form-check tw-flex tw-justify-start">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="updatePermission"
                      {...register("updatePermission")}
                    />
                    <label
                      className="form-check-label tw-ml-2"
                      htmlFor="updatePermission"
                    >
                      Modifier une permission
                    </label>
                  </div>
                </div>
                <div className="tw-border tw-p-4 tw-rounded-lg mb-4">
                  <h6 className="text-xl font-semibold mb-3">
                    Permissions Utilisateurs
                  </h6>

                  <div className="form-check tw-flex tw-justify-start">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="readUser"
                      {...register("readUser")}
                    />
                    <label
                      className="form-check-label tw-ml-2"
                      htmlFor="readUser"
                    >
                      Lire Utilisateur
                    </label>
                  </div>
                  <div className="form-check tw-flex tw-justify-start">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="createUser"
                      {...register("createUser")}
                    />
                    <label
                      className="form-check-label tw-ml-2"
                      htmlFor="createUser"
                    >
                      Créer Utilisateur
                    </label>
                  </div>
                  <div className="form-check tw-flex tw-justify-start">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="updateUser"
                      {...register("updateUser")}
                    />
                    <label
                      className="form-check-label tw-ml-2"
                      htmlFor="updateUser"
                    >
                      Modifier Utilisateur
                    </label>
                  </div>
                  <div className="form-check tw-flex tw-justify-start">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="deleteUser"
                      {...register("deleteUser")}
                    />
                    <label
                      className="form-check-label tw-ml-2"
                      htmlFor="deleteUser"
                    >
                      Supprimer Utilisateur
                    </label>
                  </div>
                </div>

                {/* Domaine Permissions */}
                <div className="tw-border tw-p-4 tw-rounded-lg mb-4">
                  <h6 className="text-xl font-semibold mb-3">
                    Permissions Domaine
                  </h6>
                  <div className="form-check tw-flex tw-justify-start">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="readDomaine"
                      {...register("readDomaine")}
                    />
                    <label
                      className="form-check-label tw-ml-2"
                      htmlFor="readDomaine"
                    >
                      Lire Domaine
                    </label>
                  </div>
                  <div className="form-check tw-flex tw-justify-start">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="createDomaine"
                      {...register("createDomaine")}
                    />
                    <label
                      className="form-check-label tw-ml-2"
                      htmlFor="createDomaine"
                    >
                      Créer Domaine
                    </label>
                  </div>
                  <div className="form-check tw-flex tw-justify-start">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="updateDomaine"
                      {...register("updateDomaine")}
                    />
                    <label
                      className="form-check-label tw-ml-2"
                      htmlFor="updateDomaine"
                    >
                      Modifier Domaine
                    </label>
                  </div>
                  <div className="form-check tw-flex tw-justify-start">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="deleteDomaine"
                      {...register("deleteDomaine")}
                    />
                    <label
                      className="form-check-label tw-ml-2"
                      htmlFor="deleteDomaine"
                    >
                      Supprimer Domaine
                    </label>
                  </div>
                </div>

                {/* Test Permissions */}
                <div className="tw-border tw-p-4 tw-rounded-lg mb-4">
                  <h6 className="text-xl font-semibold mb-3">
                    Permissions Test
                  </h6>
                  <div className="form-check tw-flex tw-justify-start">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="readTest"
                      {...register("readTest")}
                    />
                    <label
                      className="form-check-label tw-ml-2"
                      htmlFor="readTest"
                    >
                      Lire Test
                    </label>
                  </div>
                  <div className="form-check tw-flex tw-justify-start">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="createTest"
                      {...register("createTest")}
                    />
                    <label
                      className="form-check-label tw-ml-2"
                      htmlFor="createTest"
                    >
                      Créer Test
                    </label>
                  </div>
                  <div className="form-check tw-flex tw-justify-start">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="updateTest"
                      {...register("updateTest")}
                    />
                    <label
                      className="form-check-label tw-ml-2"
                      htmlFor="updateTest"
                    >
                      Modifier Test
                    </label>
                  </div>
                  <div className="form-check tw-flex tw-justify-start">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="deleteTest"
                      {...register("deleteTest")}
                    />
                    <label
                      className="form-check-label tw-ml-2"
                      htmlFor="deleteTest"
                    >
                      Supprimer Test
                    </label>
                  </div>
                </div>

                {/* Thematique Permissions */}
                <div className="tw-border tw-p-4 tw-rounded-lg">
                  <h6 className="text-xl font-semibold mb-3">
                    Permissions Thematique
                  </h6>
                  <div className="form-check tw-flex tw-justify-start">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="readThematique"
                      {...register("readThematique")}
                    />
                    <label
                      className="form-check-label tw-ml-2"
                      htmlFor="readThematique"
                    >
                      Lire Thematique
                    </label>
                  </div>
                  <div className="form-check tw-flex tw-justify-start">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="createThematique"
                      {...register("createThematique")}
                    />
                    <label
                      className="form-check-label tw-ml-2"
                      htmlFor="createThematique"
                    >
                      Créer Thematique
                    </label>
                  </div>
                  <div className="form-check tw-flex tw-justify-start">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="updateThematique"
                      {...register("updateThematique")}
                    />
                    <label
                      className="form-check-label tw-ml-2"
                      htmlFor="updateThematique"
                    >
                      Modifier Thematique
                    </label>
                  </div>
                  <div className="form-check tw-flex tw-justify-start">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="deleteThematique"
                      {...register("deleteThematique")}
                    />
                    <label
                      className="form-check-label tw-ml-2"
                      htmlFor="deleteThematique"
                    >
                      Supprimer Thematique
                    </label>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={updatePermission.isLoading}
                  >
                    {updatePermission.isLoading
                      ? "Mise à jour en cours..."
                      : "Mettre à jour"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

UpdatePermission.propTypes = {
  currentPermissionId: PropTypes.string,
  forceUpdate: PropTypes.bool,
  refreshPermissionList: PropTypes.func.isRequired,
};

export default UpdatePermission;
