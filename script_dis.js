const commentSection = document.getElementById('comment-section');
const commentForm = document.getElementById('comment-form');

// 页面加载时从本地存储读取评论并显示，同时添加删除按钮和功能
window.onload = function () {
    const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
    storedComments.forEach(function (comment) {
        addCommentToPage(comment);
    });
};

// 提交评论功能
commentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const commentText = document.getElementById('comment').value;

    if (!name.trim() || !commentText.trim()) {
        alert('姓名和评论内容不能为空');
        return;
    }

    // 创建评论对象
    const comment = {
        name: name.trim(),
        text: commentText.trim()
    };

    // 将评论添加到本地存储
    let storedComments = JSON.parse(localStorage.getItem('comments')) || [];
    storedComments.push(comment);
    localStorage.setItem('comments', JSON.stringify(storedComments));

    // 将评论添加到页面
    addCommentToPage(comment);

    // 清空表单输入框
    document.getElementById('name').value = '';
    document.getElementById('comment').value = '';
});

// 删除评论函数
function deleteComment(commentToDelete) {
    let storedComments = JSON.parse(localStorage.getItem('comments')) || [];
    // 查找要删除的评论在数组中的索引
    const index = storedComments.findIndex(comment => 
        comment.name === commentToDelete.name && comment.text === commentToDelete.text
    );

    if (index !== -1) {
        // 从数组中删除评论
        storedComments.splice(index, 1);
        localStorage.setItem('comments', JSON.stringify(storedComments));

        // 从页面上删除对应的评论显示元素
        const commentElements = document.querySelectorAll('#comment-section div');
        commentElements.forEach(function (element) {
            const name = element.querySelector('p strong').textContent.replace(':', '');
            const text = element.querySelector('p').textContent.split(':')[1].trim();
            if (name === commentToDelete.name && text === commentToDelete.text) {
                element.remove();
            }
        });
    }
}

// 将评论添加到页面的函数
function addCommentToPage(comment) {
    const commentDiv = document.createElement('div');
    commentDiv.innerHTML = `<p><strong>${comment.name}:</strong> ${comment.text}</p>`;

    // 创建删除按钮
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '删除';
    deleteButton.addEventListener('click', function () {
        // 调用删除评论函数
        deleteComment(comment);
    });

    commentDiv.appendChild(deleteButton);
    commentSection.appendChild(commentDiv);
}
