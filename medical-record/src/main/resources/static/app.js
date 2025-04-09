async function loadMedical() {
    // 将相对路径改为绝对路径，指向后端服务地址
    const response = await fetch('http://localhost:8080/api/medical');
    const records = await response.json();
    
    let html = `<h2>医疗记录管理</h2>
        <button onclick="openMedicalEditor()" style="margin-bottom:15px;">➕ 新增记录</button>
        <table>
            <tr>
                <th>家庭成员</th>
                <th>日期</th>
                <th>诊断结果</th>
                <th>操作</th>
            </tr>`;
    
    records.forEach(record => {
        html += `<tr>
            <td>${record.familyMember}</td>
            <td>${new Date(record.recordDate).toLocaleDateString()}</td>
            <td>${record.diagnosis || '暂无诊断'}</td>
            <td>
                <button onclick="openMedicalEditor(${JSON.stringify(record).replace(/"/g, '&quot;')})">编辑</button>
            </td>
        </tr>`;
    });
    
    document.getElementById('content').innerHTML = html;
}

async function loadBodyCheck() {
    // 将相对路径改为绝对路径，指向后端服务地址
    const response = await fetch('http://localhost:8080/api/bodyCheck');
    const records = await response.json();

    let html = `<h2>检查记录管理</h2>
        <button onclick="openBodyCheckEditor()" style="margin-bottom:15px;">➕ 新增检查记录</button>
        <table>
            <tr>
                <th>家庭成员</th>
                <th>检查医院</th>
                <th>检查项目</th>
                <th>检查日期</th>
                <th>诊断结果</th>
                <th>详细指标</th>
                <th>操作</th>
            </tr>`;

    records.forEach(record => {
        html += `<tr>
            <td>${record.checker}</td>
            <td>${record.hospitalName}</td>
            <td>${record.checkProject}</td>
            <td>${new Date(record.checkDate).toLocaleDateString()}</td>
            <td>${record.normal ? '正常' : '异常'}</td>
            <td>
                <button onclick="openBodyCheckEditor(${JSON.stringify(record).replace(/"/g, '&quot;')})">编辑</button>
            </td>
        </tr>`;
    });

    document.getElementById('content').innerHTML = html;
}

// 新增关闭模态框函数
function closeModal() {
    document.getElementById('medicalModal').style.display = 'none';
}

function closeBodyCheckModal() {
    document.getElementById('bodyCheckModal').style.display = 'none';
}

// 新增医疗记录操作函数
function openMedicalEditor(record = null) {
    const modal = document.getElementById('medicalModal');
    modal.style.display = 'block';
    
    if(record) {
        document.getElementById('recordId').value = record.id;
        document.getElementById('familyMember').value = record.familyMember;
        document.getElementById('recordDate').value = new Date(record.recordDate).toISOString().split('T')[0];
        document.getElementById('diagnosis').value = record.diagnosis || '';
        document.getElementById('report').value = record.report || '';
        document.getElementById('deleteBtn').style.display = 'inline-block';
    } else {
        document.getElementById('medicalForm').reset();
        document.getElementById('deleteBtn').style.display = 'none';
    }
}

// 新增检查记录操作函数
function openBodyCheckEditor(record = null) {
    const modal = document.getElementById('bodyCheckModal');
    modal.style.display = 'block';

    if(record) {
        document.getElementById('checkRecordId').value = record.id;
        document.getElementById('checker').value = record.checker;
        document.getElementById('hospitalName').value = record.hospitalName;
        document.getElementById('checkProject').value = record.checkProject;
        document.getElementById('checkDate').value = new Date(record.recordDate).toISOString().split('T')[0];
        document.getElementById('normal').value = record.normal;
        document.getElementById('deleteBodyCheckBtn').style.display = 'inline-block';
    } else {
        document.getElementById('bodyCheckForm').reset();
        document.getElementById('deleteBodyCheckBtn').style.display = 'none';
    }
}

// 动态添加检查项目
function addExamItem(btn) {
    const newItem = document.createElement('div');
    newItem.className = 'exam-item';
    newItem.innerHTML = `
        <input type="text" placeholder="项目名称">
        <input type="text" placeholder="指标数值">
        <button type="button" onclick="addExamItem(this)">+</button>
    `;
    btn.parentNode.parentNode.insertBefore(newItem, btn.parentNode.nextSibling);
}

// 保存记录
async function saveMedical(e) {
    e.preventDefault();
    
    const record = {
        id: document.getElementById('recordId').value,
        familyMember: document.getElementById('familyMember').value,
        recordDate: document.getElementById('recordDate').value,
        diagnosis: document.getElementById('diagnosis').value,
        report: document.getElementById('report').value,
        exams: Array.from(document.querySelectorAll('.exam-item')).map(item => ({
            name: item.children[0].value,
            value: item.children[1].value
        }))
    };

    const method = record.id ? 'PUT' : 'POST';
    const url = `http://localhost:8080/api/medical${method === 'PUT' ? '/' + record.id : ''}`;
    
    await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record)
    });
    
    closeModal();
    loadMedical();
}

async function saveBodyCheck(e) {
    e.preventDefault();

    const record = {
        id: document.getElementById('checkRecordId').value,
        checker: document.getElementById('checker').value,
        hospitalName: document.getElementById('hospitalName').value,
        checkProject: document.getElementById('checkProject').value,
        checkDate: document.getElementById('checkDate').value,
        normal: document.getElementById('boolean-select').value/*,
        diagnosis: document.getElementById('diagnosis').value,
        report: document.getElementById('report').value,
        exams: Array.from(document.querySelectorAll('.exam-item')).map(item => ({
            name: item.children[0].value,
            value: item.children[1].value
        }))*/
    };

    const method = record.id ? 'PUT' : 'POST';
    const url = `http://localhost:8080/api/bodyCheck${method === 'PUT' ? '/' + record.id : ''}`;

    await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record)
    });

    closeBodyCheckModal();
    loadBodyCheck();
}

// 删除记录
async function deleteMedical() {
    const id = document.getElementById('recordId').value;
    await fetch(`/api/medical/${id}`, { method: 'DELETE' });
    closeModal();
    loadMedical();
}

// 删除记录
async function deleteBodyCheck() {
    const id = document.getElementById('checkRecordId').value;
    await fetch(`/api/bodyCheck/${id}`, { method: 'DELETE' });
    closeBodyCheckModal();
    loadBodyCheck();
}
// -----------------------------动态表单--------------------------------
// 动态表单生成函数
function renderDynamicForm(data = {}) {
    const container = document.getElementById('formContainer');
    container.innerHTML = '';

    // 添加字段按钮
    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.textContent = '+ 添加字段';
    addBtn.onclick = addField;
    container.appendChild(addBtn);

    // 已有字段渲染
    Object.entries(data).forEach(([key, value]) => {
        createField(key, value);
    });
}

// 创建单个字段
function createField(key = '', value = '') {
    const fieldGroup = document.createElement('div');
    fieldGroup.className = 'field-group';
    fieldGroup.innerHTML = `
        <input type="text" placeholder="字段名称" value="${key}" class="field-key">
        <input type="text" placeholder="字段值" value="${value}" class="field-value">
        <button type="button" onclick="this.parentNode.remove()">×</button>
    `;
    document.getElementById('formContainer').appendChild(fieldGroup);
}

// 提交处理
async function submitForm() {
    const formData = {};
    document.querySelectorAll('.field-group').forEach(group => {
        const key = group.querySelector('.field-key').value;
        const value = group.querySelector('.field-value').value;
        if(key) formData[key] = value;
    });

    await fetch('/api/medical', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ formData })
    });
}

async function loadDynamicForm() {
    // 将相对路径改为绝对路径，指向后端服务地址
    /*const response = await fetch('http://localhost:8080/api/bodyCheck');
    const records = await response.json();*/
    const records = new Array();

    let html = `<h2>动态记录管理</h2>
        <button onclick="openDynamicForm()" style="margin-bottom:15px;">➕ 新增检查记录</button>`;



    document.getElementById('content').innerHTML = html;
}

function openDynamicForm(record = null) {
    const modal = document.getElementById('dynamicModal');
    modal.style.display = 'block';
}

function savaDynamicForm(record = null) {

}
// -----------------------------动态表单--------------------------------