import { useContext, useEffect, useState } from 'react';
import { SidebarContext } from '../context/SidebarContext';

const useToggleDrawer = () => {
  const [serviceId, setServiceId] = useState('');
  const [title, setTitle] = useState('');
  const { toggleDrawer, isDrawerOpen, toggleModal } =
    useContext(SidebarContext);

  const handleUpdate = (id) => { 
    // console.log(id);
    setServiceId(id);
    toggleDrawer();
  };

  const handleModalOpen = (id, title) => {
    // console.log(id, title);
    setServiceId(id);
    toggleModal();
    setTitle(title);
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setServiceId();
    }
  }, [isDrawerOpen]);

  return {
    title,
    serviceId,
    setServiceId,
    handleModalOpen,
    handleUpdate,
  };
};

export default useToggleDrawer;
