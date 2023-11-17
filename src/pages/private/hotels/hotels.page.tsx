import TextInput from "@/components/text-input";
import { useGetAllHotelQuery } from "@/stores/apis";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextAreaInput from "@/components/text-area-input";
import { nanoid } from "@reduxjs/toolkit";

const schema = z
  .object({
    name: z.string().min(1, "Este campo es obligatorio"),
    address: z.string().min(1, "Este campo es obligatorio"),
    description: z.string().min(1, "Este campo es obligatorio"),
    coverImage: z
      .string()
      .min(1, "Este campo es obligatorio")
      .url("Url no valida"),
    galery: z.array(
      z.object({
        value: z
          .string()
          .min(1, "Este campo es obligatorio")
          .url("Url no valida"),
        id: z.string(),
      })
    ),
  })
  .required();

type FormData = z.infer<typeof schema>;

const HotelsPage = () => {
  // redux
  const hotelQuery = useGetAllHotelQuery();
  // form control
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      address: "",
      description: "",
      name: "",
      coverImage: "",
      galery: [
        {
          value: "",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "galery",
  });

  // state
  // methods
  const onSubmit = (data: FormData) => console.log(data);
  const addGaleryField = () => {
    append({
      value: "",
      id: nanoid(),
    });
  };
  const removeGaleryField = (i: number) => {
    remove(i);
  };
  const onOpen = () => {
    reset();
    const modal = document.getElementById("modal") as HTMLDialogElement;
    modal.showModal();
  };
  const onClose = () => {
    reset();
    const modal = document.getElementById("modal") as HTMLDialogElement;
    modal.close();
  };

  return (
    <main className="container mx-auto">
      <section className="flex justify-between items-center p-5">
        <h1 className="font-semibold text-3xl">Hoteles</h1>
        <button
          disabled={hotelQuery.isLoading}
          onClick={() => onOpen()}
          className="btn btn-primary"
        >
          Agregar
        </button>
      </section>

      <div className="overflow-x-auto">
        <table aria-label="Tabla de hoteles" className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {hotelQuery.isLoading && (
              <tr>
                {[1, 2, 3, 4].map((el) => (
                  <td key={el}>
                    <div className="skeleton h-4 w-full"></div>
                  </td>
                ))}
              </tr>
            )}

            {hotelQuery.data ? (
              hotelQuery.data.map((el) => (
                <tr key={el.id}>
                  <td>
                    <div className="avatar">
                      <div className="w-24 rounded">
                        <img src={el.portada} />
                      </div>
                    </div>
                  </td>
                  <td>{el.nombre}</td>
                  <td>{el.direccion}</td>
                  <td>
                    {el.estado ? (
                      <IconCircleCheckFilled className="text-success" />
                    ) : (
                      <IconCircleCheckFilled className="text-error" />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No hay datos</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <dialog id="modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Crear hotel</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              textError={errors.name?.message}
              control={control}
              label="Nombre"
              name="name"
              placeholder="Ingresa un nombre"
            />

            <TextAreaInput
              textError={errors.address?.message}
              control={control}
              label="Dirección"
              name="address"
              placeholder="Ingresa una dirección"
            />

            <TextAreaInput
              textError={errors.description?.message}
              control={control}
              label="Descripción"
              name="description"
              placeholder="Ingresa una descripción"
            />

            <TextInput
              textError={errors.coverImage?.message}
              control={control}
              type="url"
              label="Portada"
              name="coverImage"
              placeholder="Ingresa una url"
            />

            <div className="divider"></div>

            <button
              onClick={() => addGaleryField()}
              className="btn btn-neutral"
            >
              Agregar imagen
            </button>

            {fields.map((field, index) => (
              <div className="flex items-center justify-between" key={field.id}>
                <div className="flex-grow">
                  <TextInput
                    textError={errors.coverImage?.message}
                    control={control}
                    type="url"
                    label="Imagen de galería"
                    name={`galery.${index}.value`}
                    placeholder="Ingresa una url"
                  />
                </div>
                <div className="flex-shrink pt-6">
                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={() => removeGaleryField(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="modal-action">
              <button
                type="button"
                onClick={() => onClose()}
                className="btn btn-neutral"
              >
                Cerrar
              </button>
              <button type="submit" className="btn btn-primary">
                Finalizar
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </main>
  );
};

export default HotelsPage;
