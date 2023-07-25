"use client";

import * as z from "zod";
import axios from "axios";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Category, Color, Image, Product, Size, Variant } from "@prisma/client";
import { Trash } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const variantSchema = z.object({
  sizeId: z.string().min(1),
  colorId: z.string().min(1),
  inStock: z.coerce.number().min(1),
});

const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  description: z.string().min(1),
  variants: z.array(variantSchema),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData:
    | (Product & {
        images: Image[];
        variants: Variant[];
      })
    | null;
  categories: Category[];
  sizes: Size[];
  colors: Color[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  sizes,
  colors,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit product" : "Create product";
  const subTitle = initialData ? "Edit product" : "Add a new product";
  const toastMessage = initialData ? "Product updated." : "Product created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(String(initialData?.price)),
          variants: initialData.variants.map((variant) => ({
            ...variant,
            inStock: parseFloat(String(variant?.inStock)),
          })),
        }
      : {
          name: "",
          images: [],
          price: 0,
          categoryId: "",
          isFeatured: false,
          isArchived: false,
          description: "",
          variants: [
            {
              sizeId: "",
              colorId: "",
              inStock: 1,
            },
          ],
        },
  });

  const variants = form.watch("variants");

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/products`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/products/${params.productId}`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success("Product deleted.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      {/* Product delete */}
      <div className="flex items-center justify-between">
        <Heading title={title} description={subTitle}></Heading>
        {initialData && (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
            disabled={loading}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          className="w-full space-y-8"
        >
          {/* Image(s) upload */}
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="9.99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Category */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Is Featured | Is Archived */}
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start p-4 space-x-3 space-y-0 border rounded-md">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                  </div>
                  <FormDescription>
                    This product will appear on the home page
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start p-4 space-x-3 space-y-0 border rounded-md">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archived</FormLabel>
                  </div>
                  <FormDescription>
                    This product will not appear anywhere in the store
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Variants */}
            <FormField
              control={form.control}
              name="variants"
              render={({ field }) => (
                <div>
                  {variants.map((variant, index) => (
                    <div key={index} className="grid grid-cols-4 gap-8">
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <Select
                          disabled={loading}
                          onValueChange={(value) => {
                            const newVariants = [...variants];
                            if (newVariants[index]) {
                              newVariants[index].colorId = value;
                              field.onChange(newVariants);
                            }
                          }}
                          value={variant.colorId}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                defaultValue={variant.colorId}
                                placeholder="Select a color"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {colors.map((color) => (
                              <SelectItem key={color.id} value={color.name}>
                                {color.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>

                      <FormItem>
                        <FormLabel>Size</FormLabel>
                        <Select
                          disabled={loading}
                          onValueChange={(value) => {
                            const newVariants = [...variants];
                            newVariants[index].sizeId = value;
                            field.onChange(newVariants);
                          }}
                          value={variant.sizeId}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                defaultValue={variant.sizeId}
                                placeholder="Select a size"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {sizes.map((size) => (
                              <SelectItem key={size.id} value={size.name}>
                                {size.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>

                      <FormItem>
                        <FormLabel>In Stock</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={loading}
                            placeholder="0"
                            value={variant.inStock}
                            onChange={(e) => {
                              const newVariants = [...variants];
                              if (newVariants[index]) {
                                newVariants[index].inStock = Number(
                                  e.target.value
                                );
                                field.onChange(newVariants);
                              }
                            }}
                          />
                        </FormControl>
                      </FormItem>

                      <FormItem>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => {
                            const newVariants = variants.filter(
                              (_, variantIndex) => variantIndex !== index
                            );
                            field.onChange(newVariants);
                          }}
                          disabled={loading}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </FormItem>
                    </div>
                  ))}
                </div>
              )}
            />

            {/* Add variant button */}
            <FormItem>
              <Button
                onClick={() =>
                  form.setValue("variants", [
                    ...form.watch("variants"),
                    {
                      colorId: "default",
                      sizeId: "default",
                      inStock: 1,
                    },
                  ])
                }
              >
                Add variant
              </Button>
            </FormItem>
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
