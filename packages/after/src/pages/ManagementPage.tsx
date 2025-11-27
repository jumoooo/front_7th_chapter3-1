import React from "react";
import { Button } from "../components/ui/button";
import {
  ManagementPageHeader,
  EntityTypeTabs,
  ManagementAlerts,
  StatsCards,
  EntityTable,
  CreateEntityModal,
  EditEntityModal,
} from "../components/domain/management";
import { useEntityManagement } from "../hooks/useEntityManagement";

export const ManagementPage: React.FC = () => {
  // 비즈니스 로직은 hook에서 관리
  const {
    // 상태
    entityType,
    setEntityType,
    data,
    isCreateModalOpen,
    setIsCreateModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    selectedItem,
    setSelectedItem,
    showSuccessAlert,
    setShowSuccessAlert,
    alertMessage,
    showErrorAlert,
    setShowErrorAlert,
    errorMessage,
    formData,
    setFormData,
    // 핸들러
    handleCreate,
    handleEdit,
    handleUpdate,
    handleDelete,
    handleStatusAction,
    // 유틸리티 결과
    stats,
    tableColumns,
  } = useEntityManagement();

  return (
    <>
      <div className="w-full bg-background" aria-label="관리 시스템">
        {/* Before: maxWidth: '1200px', margin: '0 auto', padding: '20px' */}
        <div className="max-w-[1200px] mx-auto p-[20px]">
          <ManagementPageHeader />

          {/* Before: background: 'white', border: '1px solid #ddd', padding: '10px' */}
          <section
            className="bg-card border border-border rounded-sm p-[10px]"
            aria-labelledby="entity-type-tabs">
            <EntityTypeTabs
              entityType={entityType}
              onEntityTypeChange={setEntityType}
            />

            <div
              id="entity-content"
              role="tabpanel"
              aria-labelledby={`tab-${entityType}`}>
              {/* Before: marginBottom: '15px' */}
              <div className="mb-[15px] text-right">
                <Button
                  variant="default"
                  size="default"
                  onClick={() => setIsCreateModalOpen(true)}>
                  새로 만들기
                </Button>
              </div>

              <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="sr-only">
                {showSuccessAlert && alertMessage}
                {showErrorAlert && errorMessage}
              </div>

              <ManagementAlerts
                showSuccess={showSuccessAlert}
                successMessage={alertMessage}
                onCloseSuccess={() => setShowSuccessAlert(false)}
                showError={showErrorAlert}
                errorMessage={errorMessage}
                onCloseError={() => setShowErrorAlert(false)}
              />

              <StatsCards stats={stats} />

              <section
                className="mt-4"
                aria-label={`${
                  entityType === "user" ? "사용자" : "게시글"
                } 목록`}>
                <EntityTable
                  columns={tableColumns}
                  data={data}
                  entityType={entityType}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onPublish={(id) => handleStatusAction(id, "publish")}
                  onArchive={(id) => handleStatusAction(id, "archive")}
                  onRestore={(id) => handleStatusAction(id, "restore")}
                />
              </section>
            </div>
          </section>
        </div>
      </div>

      <CreateEntityModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setFormData({});
        }}
        entityType={entityType}
        formData={formData}
        onFormDataChange={setFormData}
        onSubmit={handleCreate}
      />

      <EditEntityModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setFormData({});
          setSelectedItem(null);
        }}
        entityType={entityType}
        selectedItem={selectedItem}
        formData={formData}
        onFormDataChange={setFormData}
        onSubmit={handleUpdate}
      />
    </>
  );
};
