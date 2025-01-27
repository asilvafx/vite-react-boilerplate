import React from 'react';
import { Modal, Dropdown, Button, TextInput, Label, Textarea } from "flowbite-react";

const ModalCreate = ({ show, onClose }) => {
    return (
        <div>
            <Modal dismissible show={show} onClose={onClose}>
                <Modal.Header>Add Product</Modal.Header>
                <Modal.Body>
                    <form action="#">
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                                <Label htmlFor="name" value="Name" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    placeholder="Type product name"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="brand" value="Brand" />
                                <TextInput
                                    id="brand"
                                    type="text"
                                    placeholder="Product brand"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="price" value="Price" />
                                <TextInput
                                    id="price"
                                    type="number"
                                    placeholder="$2999"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="category" value="Category" />
                                <Dropdown label="Select Category" dismissOnClick={false} className="flowbite-dropdown">
                                    <Dropdown.Item className="bg-transparent border-0 shadow-0">Dashboard</Dropdown.Item>
                                    <Dropdown.Item className="bg-transparent border-0 shadow-0">Settings</Dropdown.Item>
                                    <Dropdown.Item className="bg-transparent border-0 shadow-0">Earnings</Dropdown.Item>
                                    <Dropdown.Item className="bg-transparent border-0 shadow-0">Sign out</Dropdown.Item>
                                </Dropdown>
                            </div>
                            <div className="sm:col-span-2">
                                <Label htmlFor="description" value="Description" />
                                <Textarea
                                    id="description"
                                    rows={4}
                                    placeholder="Write product description here"
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full">
                            Add new
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ModalCreate;