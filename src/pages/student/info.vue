<template>
  <Fluid class="flex justify-center p-2">
    <div class="flex mt-3">
      <div class="card flex flex-col gap-4 w-full p-4 rounded-lg shadow-md bg-white text-gray-800">
        <div class="text-center mb-6">
          <img class="mx-auto" width="80" height="80" src="/tlogow.png" alt="Tañon College Logo" />
          <h1 class="text-red-800 text-xl font-bold">TAÑON COLLEGE</h1>
          <h2 class="text-gray-700 text-md">OFFICE OF THE REGISTRAR AND ADMISSIONS</h2>
          <p class="text-gray-600 text-sm">San Carlos City, Negros Occidental</p>
        </div>
        <!-- Student Information -->
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex flex-wrap gap-2 w-full">
            <label for="firstname">First Name</label>
            <InputText
              id="firstname"
              type="text"
              class="p-2 border rounded w-full bg-gray-700 text-white border-gray-600"
            />
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label for="middlename">Middle Name</label>
            <InputText
              id="middlename"
              type="text"
              class="p-2 border rounded w-full bg-gray-700 text-white border-gray-600"
            />
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label for="lastname">Last Name</label>
            <InputText
              id="lastname"
              type="text"
              class="p-2 border rounded w-full bg-gray-700 text-white border-gray-600"
            />
          </div>
        </div>

        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex flex-wrap gap-2 w-full">
            <label for="sex">Sex</label>
            <Dropdown id="sex" optionLabel="name" placeholder="Select Sex" class="w-full" />
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label for="civilstatus">Civil Status</label>
            <Dropdown
              id="civilstatus"
              optionLabel="name"
              placeholder="Select Status"
              class="w-full"
            />
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label for="mobileno">Mobile No.</label>
            <InputText
              id="mobileno"
              type="text"
              class="p-2 border rounded w-full border-red-500"
              placeholder="09XXXXXXXXX"
              maxlength="11"
            />
            <span class="text-red-600 text-sm">Invalid mobile number (must be 11 digits)</span>
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex flex-wrap gap-2 w-full">
            <label for="date">Date of Birth</label>
            <label for="dateofbirth">Date of Birth</label>
            <Calendar dateFormat="yy-mm-dd" showIcon class="w-full" />
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label for="civilstatus">Year</label>
            <Dropdown
              id="civilstatus"
              optionLabel="name"
              placeholder="Select Year"
              class="w-full"
            />
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label for="civilstatus">Semester</label>
            <Dropdown
              id="civilstatus"
              optionLabel="name"
              placeholder="Select Semester"
              class="w-full"
            />
          </div>
        </div>

        <div class="flex flex-wrap">
          <label for="placeofbirth">Place of Birth</label>
          <Textarea id="placeofbirth" placeholder="Street / Barangay / City / Province" rows="1" />
        </div>

        <!-- Contact Information -->
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex flex-wrap gap-2 w-full">
            <label for="parents">Parents/Guardian Name</label>
            <InputText id="parents" type="text" />
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label for="mobileno">Mobile No.</label>
            <InputText
              id="mobileno"
              type="text"
              class="p-2 border rounded w-full border-red-500"
              placeholder="09XXXXXXXXX"
              maxlength="11"
            />
            <span class="text-red-600 text-sm">Invalid mobile number (must be 11 digits)</span>
          </div>
        </div>

        <div class="flex flex-wrap">
          <label for="address">Home Address</label>
          <Textarea id="address" placeholder="Street / Barangay / City / Province" rows="1" />
        </div>

        <!-- Course and Major Selection -->
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex flex-wrap gap-2 w-full">
            <label for="course">Course</label>
            <select class="w-full p-2 border rounded">
              <option>
                {{ 0 }}
              </option>
            </select>
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label for="major">Major</label>
            <select class="w-full p-2 border rounded">
              <option>
                {{ 0 }}
              </option>
            </select>
          </div>
        </div>

        <div>
          <Button
            label="Submit"
            severity="danger"
            raised
            class="w-full py-2 rounded-lgbg-red-600"
          />
        </div>
      </div>
    </div>
  </Fluid>
</template>
